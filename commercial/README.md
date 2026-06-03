# AVO Transportation — 15s Animated Commercial (Remotion)

A code-driven 2D animated spot — **vertical 9:16 (1080×1920), 15s @ 30fps**.

**"Did You Guys Teleport?!"** — the AVO crew screeches in, clears a whole garage
in seconds, and the customer comes out in a robe with their coffee, unable to
believe how fast it happened.

## Preview & edit
```bash
cd commercial
npm install
npm run dev        # opens Remotion Studio in your browser to scrub/preview
```

## Render the MP4
```bash
npm run render     # -> out/avo-commercial.mp4
```
The first render auto-downloads a headless browser (needs normal internet).
A pre-rendered copy is committed at **`avo-commercial.mp4`**.

## Add the AI voiceover (optional)
The spot is fully readable **silent** (comic speech bubbles + captions), so it
works on social with the sound off. To add the AI voice:
1. Generate **one** audio file of the script (lines + timings are in
   `src/voiceover.ts`) using any AI voice tool — ElevenLabs' free tier works well.
2. Save it as `public/vo/voiceover.mp3`.
3. Set `ENABLE_VOICEOVER = true` in `src/voiceover.ts`, then `npm run render`.

Background music works the same way: `public/music/track.mp3` + `ENABLE_MUSIC = true`.

## Other sizes
Change `width`/`height` in `src/Root.tsx`:
- **1:1 square** → 1080×1080 (Instagram/Facebook feed)
- **16:9 wide** → 1920×1080 (YouTube / website)

## Where things live
- **Script & timing:** `src/voiceover.ts` + the `<Sequence>` blocks in `src/Commercial.tsx`
- **Colors / brand:** `src/theme.ts`
- **Characters:** `src/components/Crew.tsx`, `Customer.tsx`
- **Scene & truck:** `src/components/Background.tsx`, `Truck.tsx`
