# Summit Tuition — Product Demo Video

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
