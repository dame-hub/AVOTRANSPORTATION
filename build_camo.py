import numpy as np
from PIL import Image, ImageFilter

W, H = 1080, 1920
rng = np.random.default_rng(20)

def octave(cells_x):
    cells_y = max(1, round(cells_x * H / W))
    g = rng.random((cells_y + 1, cells_x + 1))
    im = Image.fromarray((g * 255).astype("uint8")).resize((W, H), Image.BICUBIC)
    return np.asarray(im, dtype=np.float64) / 255.0

def color_field(cells):
    # organic field per color: coarse blobs + finer irregular edges
    return octave(cells) + 0.40 * octave(int(cells * 2.1)) + 0.18 * octave(int(cells * 4.3))

# --- BAPE-style blue camo via argmax of independent organic fields (interspersed patches) ---
palette = [
    (16,  36, 110),   # deep navy
    (30,  92, 214),   # royal/cobalt blue
    (74,  140, 226),  # medium blue
    (140, 186, 240),  # light blue
    (214, 232, 255),  # pale powder
]
biases = [ -0.06, 0.10, 0.04, 0.02, -0.05 ]   # tune area proportions

fields = []
for i in range(len(palette)):
    f = color_field(7 + (i % 3))
    f = (f - f.mean()) / (f.std() + 1e-6)
    fields.append(f + biases[i] * 6.0)

stack = np.stack(fields, axis=-1)
idx = np.argmax(stack, axis=-1).astype("uint8")

# clean tiny specks -> rounder camo blobs
idx_im = Image.fromarray(idx).filter(ImageFilter.ModeFilter(size=9))
idx = np.asarray(idx_im)

pal = np.array(palette, dtype=np.float64)
cam = pal[idx]

# subtle large-scale shading for depth
shade = octave(3)
shade = 0.90 + 0.16 * (shade - shade.mean()) / (shade.std() + 1e-6).clip(1e-6)
cam = np.clip(cam * shade[..., None], 0, 255)

# --- soft dark "fade" halo behind logo (ties to logo's dark origin, lets it melt in) ---
yy, xx = np.mgrid[0:H, 0:W].astype(np.float64)
cx, cy = W / 2.0, H * 0.43
r = np.sqrt(((xx - cx) / (W * 0.58)) ** 2 + ((yy - cy) / (H * 0.37)) ** 2)
glow = np.clip(1.0 - r, 0, 1) ** 1.9
cam = cam * (1.0 - 0.52 * glow[..., None])      # darken center softly
cam = np.clip(cam, 0, 255).astype("uint8")
bg = Image.fromarray(cam, "RGBA" if cam.shape[-1] == 4 else "RGB").convert("RGBA")

# --- logo with fading effect ---
logo = Image.open("assets/avo-logo-full.png").convert("RGBA")
target_w = int(W * 0.80)
target_h = round(logo.height * target_w / logo.width)
logo = logo.resize((target_w, target_h), Image.LANCZOS)

la = np.array(logo).astype(np.float64)
alpha = la[:, :, 3] / 255.0

# fade: overall ghosting + gentle top->bottom fade + soft radial edge falloff
ly, lx = np.mgrid[0:target_h, 0:target_w].astype(np.float64)
vert = np.clip(1.0 - (ly / target_h) * 0.48, 0, 1)          # fade downward
rr = np.sqrt(((lx - target_w / 2) / (target_w * 0.62)) ** 2 +
             ((ly - target_h / 2) / (target_h * 0.62)) ** 2)
edge = np.clip(1.0 - (rr - 0.72) / 0.5, 0, 1)               # soft edge melt
fade = 0.95 * vert * edge
la[:, :, 3] = np.clip(alpha * fade * 255.0, 0, 255)
logo_faded = Image.fromarray(la.astype("uint8"), "RGBA")

px = (W - target_w) // 2
py = int(H * 0.43 - target_h / 2)
bg.alpha_composite(logo_faded, (px, py))

out = bg.convert("RGB")
out.save("assets/avo-camo-wallpaper.png")
# smaller preview for quick viewing
out.resize((W // 2, H // 2), Image.LANCZOS).save("preview.png")
print("saved", out.size)
