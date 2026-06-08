import numpy as np
from PIL import Image

W, H = 1080, 1920
rng = np.random.default_rng(11)

# --- AVO motif (arrow + ring) ---
sym = Image.open("assets/avo-symbol.png").convert("RGBA")
sym = sym.crop(sym.getbbox())

def octave(cells):
    cy = max(1, round(cells * H / W))
    g = rng.random((cy + 1, cells + 1))
    return np.asarray(Image.fromarray((g * 255).astype("uint8")).resize((W, H), Image.BICUBIC), float) / 255

# low-freq field so tones cluster into camo-like regions
field = octave(4) + 0.5 * octave(9)
field = (field - field.min()) / (field.max() - field.min())

# --- base vertical gradient (deep navy -> blue) ---
top = np.array([12, 28, 78]); bot = np.array([26, 64, 140])
grad = np.linspace(0, 1, H)[:, None, None]
base = (top * (1 - grad) + bot * grad)
base = np.repeat(base, W, axis=1).astype("uint8")
canvas = Image.fromarray(base, "RGB").convert("RGBA")

tones = [(28, 60, 146), (42, 108, 218), (94, 162, 236), (172, 208, 248)]
ops   = [0.96, 0.86, 0.72, 0.55]   # lighter tones a touch softer -> depth

def stamp(h, color, opacity, rot):
    scale = h / sym.height
    w = max(1, int(sym.width * scale))
    s = sym.resize((w, h), Image.LANCZOS)
    a = (np.array(s)[:, :, 3].astype(float) / 255.0) * opacity
    arr = np.zeros((h, w, 4), float)
    arr[:, :, 0] = color[0]; arr[:, :, 1] = color[1]; arr[:, :, 2] = color[2]
    arr[:, :, 3] = a * 255
    img = Image.fromarray(arr.astype("uint8"), "RGBA")
    if rot:
        img = img.rotate(rot, resample=Image.BICUBIC, expand=True)
    return img

# --- all-over AVO print, brick layout with jitter ---
step = 168
row = 0
for cy in range(-step // 2, H + step, int(step * 0.9)):
    off = (step // 2) if row % 2 else 0
    for cx in range(-step, W + step, step):
        x = cx + off + int(rng.integers(-18, 18))
        y = cy + int(rng.integers(-18, 18))
        xi = min(W - 1, max(0, x)); yi = min(H - 1, max(0, y))
        ci = min(3, int(field[yi, xi] * 4))
        h = int(step * rng.uniform(0.82, 1.04))
        st = stamp(h, tones[ci], ops[ci], float(rng.uniform(-16, 16)))
        canvas.alpha_composite(st, (x - st.width // 2, y - st.height // 2))
    row += 1

# --- mute the print so it reads as a faded background ---
veil = Image.new("RGBA", (W, H), (14, 30, 74, 44))
canvas = Image.alpha_composite(canvas, veil)

# --- soft dark halo behind hero logo ---
yy, xx = np.mgrid[0:H, 0:W].astype(float)
cx0, cy0 = W / 2.0, H * 0.43
r = np.sqrt(((xx - cx0) / (W * 0.52)) ** 2 + ((yy - cy0) / (H * 0.34)) ** 2)
glow = np.clip(1 - r, 0, 1) ** 1.9
cam = np.array(canvas).astype(float)
cam[:, :, :3] *= (1 - 0.5 * glow[..., None])
canvas = Image.fromarray(np.clip(cam, 0, 255).astype("uint8"), "RGBA")

# --- hero AVO logo (crisp focal point, gentle fade) ---
logo = Image.open("assets/avo-logo-full.png").convert("RGBA")
tw = int(W * 0.78); th = round(logo.height * tw / logo.width)
logo = logo.resize((tw, th), Image.LANCZOS)
la = np.array(logo).astype(float); alpha = la[:, :, 3] / 255.0
ly, lx = np.mgrid[0:th, 0:tw].astype(float)
vert = np.clip(1 - (ly / th) * 0.45, 0, 1)
rr = np.sqrt(((lx - tw / 2) / (tw * 0.62)) ** 2 + ((ly - th / 2) / (th * 0.62)) ** 2)
edge = np.clip(1 - (rr - 0.72) / 0.5, 0, 1)
la[:, :, 3] = np.clip(alpha * 0.95 * vert * edge * 255, 0, 255)
canvas.alpha_composite(Image.fromarray(la.astype("uint8"), "RGBA"),
                       ((W - tw) // 2, int(H * 0.43 - th / 2)))

out = canvas.convert("RGB")
out.save("assets/avo-camo-wallpaper.png")
out.resize((600, 1067), Image.LANCZOS).save("preview.png")
out.crop((40, 40, 580, 580)).save("preview_crop.png")   # background detail
print("saved", out.size)
