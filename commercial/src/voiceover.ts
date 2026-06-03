// ---------------------------------------------------------------------------
// AI VOICEOVER + MUSIC (optional layers)
//
// The film is fully readable SILENT (comic speech bubbles + the "DONE!" /
// SFX beats), so it works on social with the sound off. To add the AI voice:
//
//   1. Generate ONE audio file of the whole script below using any AI voice
//      tool (ElevenLabs free tier, PlayHT, or even your phone's TTS).
//   2. Save it as:  commercial/public/vo/voiceover.mp3
//   3. Set ENABLE_VOICEOVER = true and re-render (`npm run render`).
//
// Same idea for background music -> commercial/public/music/track.mp3
// ---------------------------------------------------------------------------

export const ENABLE_VOICEOVER = false;
export const ENABLE_MUSIC = false;

// The script, with the frame (30fps) each line should land on.
export const SCRIPT = [
  { frame: 72, who: "Crew", line: "AVO — let's GO!" },
  { frame: 252, who: "Customer", line: "Wait — did you guys TELEPORT?!" },
  { frame: 298, who: "Crew", line: "Nope. Just AVO." },
  { frame: 332, who: "Customer", line: "My whole garage is GONE?!" },
  { frame: 374, who: "Narrator", line: "AVO Transportation — junk gone fast. Get a free quote at avotransportation dot com." },
];
