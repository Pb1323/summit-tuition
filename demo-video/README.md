# Summit Tuition — Remotion Video Projects

This project has two separate Remotion compositions sharing one npm install:
the original 16:9 YC demo video (below), and a vertical (`9:16`) kinetic-
typography "short" template (see [Vertical shorts template](#vertical-shorts-template)
further down) for marketing clips — text/visuals only, no voice or footage.

## Product demo video (`SummitTuitionDemo`)

A ~82 second Remotion product demo for the Summit Tuition YC application: cold
open, problem statement, product reveal, a 3-beat feature walkthrough
(proctored conditions → automated marking → parent-facing topic breakdown),
a traction/stats beat, and a close with wordmark + URL.

Composition: `1920x1080`, `30fps`, id `SummitTuitionDemo`, ~2450 frames total
(see `src/Composition.tsx` — duration is computed from each scene's length
minus the 20-frame crossfade overlap between scenes).

## Structure

```
src/
  theme.ts                 colors, fonts (Fraunces serif + Inter sans via @remotion/google-fonts)
  Composition.tsx           registers the composition, sequences all scenes with crossfade offsets
  Root.tsx                  Remotion entry point
  components/
    Scene.tsx               fade in/out wrapper used by every scene
    Wordmark.tsx             "SUMMIT TUITION" wordmark + tagline
    BrowserFrame.tsx         mocked browser chrome around product UI
    PlaceholderShot.tsx      dashed gray box — swap for real screenshots
    KenBurns.tsx             slow pan+zoom wrapper for screenshots/mockups
  scenes/
    ColdOpen.tsx             0. wordmark fade-in on navy
    ProblemStatement.tsx     1. three building lines of problem-statement copy
    ProductReveal.tsx        2. browser frame reveal of the mock exam room
    FeatureWalkthrough.tsx   3. three 10s beats: timer, marking, topic breakdown
    Traction.tsx             4. three large gold stat callouts
    Close.tsx                5. wordmark + URL, fades to solid navy at the end
```

## 1. Swapping in real screenshots

Every screen mockup is currently hand-built with real navy/gold/cream styling
(not a gray box) EXCEPT the one spot inside `ProductReveal.tsx` that uses
`<PlaceholderShot label="..." />` — that's the one true "drop a screenshot
here" slot, since the brief said real screenshots would be supplied later.

To swap it in:

1. Put the screenshot in `public/` (e.g. `public/screenshots/mock-room.png`).
2. In `src/scenes/ProductReveal.tsx`, replace the `<PlaceholderShot ... />`
   with:

   ```tsx
   import { Img, staticFile } from "remotion";
   // ...
   <Img src={staticFile("screenshots/mock-room.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
   ```

3. The `<KenBurns>` wrapper around it already provides the pan+zoom — no
   other changes needed.

If you'd rather replace the fully-built UI mockups in `FeatureWalkthrough.tsx`
(`TimerVisual`, `MarkingVisual`, `BreakdownVisual`) with real screenshots
instead of the hand-drawn versions, swap each one out the same way — each is
just a plain React component passed into a `BrowserFrame`.

## 2. Swapping in real numbers

Open `src/scenes/Traction.tsx` and edit the `STATS` array — replace the
`[X]` / `[Y]` / `[Z]` placeholders with real figures:

```ts
const STATS: Stat[] = [
  { value: "[X] students", label: "prepared on Summit since launch" },
  { value: "[Y] mock papers", label: "GL & school-style, marked instantly" },
  { value: "[Z]% report accuracy", label: "vs. real entrance exam outcomes" },
];
```

Each stat gets 5 seconds on screen (`STAT_DURATION = 150` frames). If you
add or remove entries from the array, also update `TRACTION_DURATION` in the
same file to `STATS.length * STAT_DURATION` so the scene's total length
still matches.

## 3. Rendering

Preview live in Remotion Studio:

```bash
npm install
npm run dev
```

Render the final MP4:

```bash
npx remotion render SummitTuitionDemo out/summit-tuition-demo.mp4
```

Render a single frame or short range while iterating (much faster than a
full render):

```bash
npx remotion render SummitTuitionDemo out/preview.mp4 --frames=0-90
```

## Notes

- Pacing follows the original brief's beat sheet closely; the final runtime
  landed at ~82s (under the 90s ceiling) once scene-to-scene crossfades
  (20-frame overlaps) are accounted for.
- Fonts, colors, and easing all live in `src/theme.ts` — this is the one
  place to touch if the brand palette or type ever changes.
- All motion is deliberately slow and understated (custom cubic ease-in-out,
  no bounce/overshoot) to match the "premium, Oxford-academic" direction
  rather than a startup-flashy feel.

---

## Vertical shorts template

A reusable **1080x1920, 30fps, text-only** kinetic-typography template for
short-form marketing clips (TikTok/Reels/YouTube Shorts style) — no voice
track, no camera footage, no logo. A subtle two-tone beige checkerboard
background, warm orange accent color, bold serif headline type (Literata)
punching in word-by-word over a slow continuous zoom, plus small kicker
labels and a hand-drawn underline accent for CTA beats.

This is a **style/layout homage**, not a copy of any single brand's exact
colors, fonts, or logo — see `src/shorts/theme.ts` if the palette needs to
shift for a different look.

Composition id: `SummitShort`. Sample script totals 6 beats / ~13s.

### Structure

```
src/shorts/
  theme.ts                     beige/orange palette, Literata + Inter fonts (separate from the 16:9 demo's theme.ts)
  script.ts                    the actual video copy — THE file to edit for a new video
  ShortComposition.tsx          registers the composition, sequences beats from script.ts
  components/
    CheckeredBackground.tsx    persistent, slowly-drifting two-tone beige checker (renders once, behind all beats)
    ShortScene.tsx              per-beat fade in/out wrapper (mirrors components/Scene.tsx's pattern)
    BeatText.tsx                kicker + word-by-word headline reveal + continuous zoom-in
    AccentUnderline.tsx         hand-drawn-style underline accent, used on CTA beats
```

### Writing a new video

Everything content-specific lives in **`src/shorts/script.ts`** as a `SCRIPT`
array of beats. Each beat is one screen of text:

```ts
{
  kicker: "THE PROBLEM",             // optional small label above the headline
  words: [
    { text: "Most" },
    { text: "mocks" },
    { text: "don't" },
    { text: "feel" },
    { text: "real.", accent: true }, // accent: true = rendered in orange
  ],
  durationInFrames: 75,               // 2.5s at 30fps
  underline: false,                   // true = draw an accent underline under the headline (CTA beats)
}
```

Guidelines for new copy:
- Keep each beat to **3-6 words** — the word-by-word reveal stops reading
  clearly beyond that at this pace.
- Use `accent: true` on the one word/phrase per beat you want to emphasize,
  not the whole line.
- 75 frames (2.5s) per beat is a reasonable default; bump it up for a beat
  with more words (e.g. a URL) so the reveal has time to finish before the
  fade-out starts.
- No audio track is wired up at all yet — if background music is wanted,
  it'd be a new `<Audio>` element in `ShortComposition.tsx` layered under
  the beats; not done here since no track was supplied.

### Rendering

```bash
npx remotion render SummitShort out/summit-short.mp4
```

Grab a single still frame while iterating on a beat's look (much faster than
a full render):

```bash
npx remotion still SummitShort out/preview.png --frame=40
```

### Known limitations / next steps

- **Copy is a placeholder sample** (generic Summit Tuition pitch beats) —
  replace `SCRIPT` in `script.ts` with real copy before using this for an
  actual campaign.
- **No background music** — silent as-is; add a track before publishing if
  the target platform doesn't auto-suggest one.
- **Not yet matched frame-for-frame against the reference videos** the
  template was inspired by — I have no way to watch video content directly
  (no video-analysis tool available in this session), so the beat structure,
  pacing, and "zoom in top half only" framing described for those reference
  videos are approximated from a text description, not verified against the
  actual footage. Worth a side-by-side comparison once real reference frames
  or screenshots are available.
- The original reference videos apparently split the frame (animated top +
  talking-head bottom); this template is deliberately **full-frame text**
  only, per an explicit "no voice, no talking head" instruction — so it's a
  different shot structure by design, not an oversight.
