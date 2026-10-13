Add an interactive **fluid cursor trail with floating technology bubbles** to my existing React project.

Reference: https://www.aaabadcode.com/

I already have a project and layout. **Implement this effect inside my existing application. Do not scaffold a new project, replace my layout, rewrite unrelated components, or change my framework.**

The desired result is a colorful, swirling fluid trail following the cursor, with circular bubbles mixed into the trail. Some circles contain labels such as “JS,” “React,” “Next.js,” and “Mobile Apps.”

## 1. Inspect the existing project first

Before implementing:

- Identify the framework, React version, language, styling system, and package manager.
- Inspect the existing page structure, shared layout, stacking contexts, and animation dependencies.
- Reuse existing utilities and conventions.
- Determine where the effect should mount so navigation does not create duplicate canvases or animation loops.
- Check whether the project already uses `motion` or `framer-motion`. Preserve the existing package rather than installing both.
- If this is Next.js, keep browser APIs inside client components and effects. Do not access `window`, `document`, or canvas contexts during server rendering.
- Preserve existing routing, content, typography, spacing, forms, and interactions.

Proceed with reasonable implementation decisions after inspection.

## 2. Exact visual effect

There are two coordinated visual layers.

### Layer A: Fluid color trail

Create a continuous fluid simulation that resembles colored ink or soft liquid moving through water.

When the pointer moves:

- Color appears along its path.
- The trail flows, curls, blends, and gradually dissipates.
- Faster movement produces stronger directional motion.
- Slower movement produces smaller, softer swirls.
- The fluid continues moving briefly after the pointer stops.
- Colors transition smoothly without flickering.

Do not substitute a blurred circle following the cursor, a static gradient, a ribbon, or a collection of ordinary particles for the fluid simulation.

### Layer B: Round technology bubbles

Spawn circular particles inside and around that same fluid trail.

- Some circles are plain colored bubbles.
- Some contain technology labels.
- Bubbles inherit momentum from pointer movement and drift gently.
- Their color should coordinate with the fluid injected at the same position.
- They expand slightly on entry, then fade naturally.
- Text stays sharp and readable while the fluid moves behind it.

The two layers should feel like one effect, not two independent cursor animations.

## 3. Libraries and rendering technology

### Fluid simulation: direct WebGL

Use a lightweight WebGL fluid simulation running inside a canvas.

A suitable implementation reference is **PavelDoGreat/WebGL-Fluid-Simulation**. Inspect its current source and license before reuse. If adapting it, preserve required attribution and extract the simulation into a maintainable module with explicit lifecycle methods.

An alternative is the **React Bits Splash Cursor** implementation, if its current implementation and license are suitable. Inspect it before use, and adapt it to support cleanup, configuration, and failure handling.

Choose one implementation path. Do not combine multiple fluid engines.

Requirements:

- Prefer WebGL2 when available.
- Use WebGL1 only when supported by the implementation and required extensions.
- Verify the context and required framebuffer capabilities before initializing.
- Keep shader programs, buffers, textures, and framebuffers inside a dedicated engine.
- Do not add Three.js or React Three Fiber solely for this fullscreen effect.
- Do not assume an npm package exists based on the name of a demo component.

### Bubbles and text: Canvas 2D

Use a separate Canvas 2D overlay for circular particles and text.

No extra particle library is required.

Canvas 2D should handle:

- Circle rendering.
- Text measurement and placement.
- Particle movement.
- Opacity and scale transitions.
- Lifetime management.

Avoid creating a React DOM element for every bubble.

### Animation loop: requestAnimationFrame

Use browser-native `requestAnimationFrame` for fluid and particle updates.

- Prefer one coordinated animation loop.
- Use delta time so movement remains consistent across refresh rates.
- Keep mutable animation data in refs or engine objects.
- Do not update React state on every pointer event or frame.

### Motion for React: optional

The cursor effect itself does not require Motion.

If the project already uses Motion, reuse it only for an optional settings panel or existing UI transitions. Do not introduce Motion just to animate canvas particles.

Do not add GSAP, Anime.js, Lottie, or another animation library for this effect.

## 4. Integration and layout

Preserve my current layout. Add a decorative effect layer behind the existing content.

Suggested conceptual structure:

- Existing application/page wrapper.
  - Decorative effect container.
    - WebGL fluid canvas.
    - Canvas 2D bubble canvas.
  - Existing content.
  - Existing menus, dialogs, and overlays.

Use a deliberate stacking order within a controlled stacking context:

- Fluid canvas: lowest decorative layer.
- Bubble canvas: immediately above the fluid.
- Existing page content: above both canvases.
- Existing dialogs, navigation overlays, and popovers: retain their correct positions above the content.

Do not blindly assign large global z-index values or modify every existing component.

### Effect container

For a viewport-wide effect:

- Use `position: fixed`.
- Use `inset: 0`.
- Fill the visible viewport.
- Use `pointer-events: none`.
- Mark the decorative container as `aria-hidden`.
- Avoid introducing scrollbars.
- Avoid negative z-index values that can place the canvases behind the page background.

If the existing design has an opaque hero or page surface that hides a global background canvas, integrate the effect within the intended section instead. Do not remove unrelated backgrounds to expose it.

For a section-scoped effect:

- Use a positioned wrapper.
- Use an absolutely positioned effect container.
- Calculate pointer coordinates relative to that section.
- Stop spawning when the pointer leaves the section.

Choose the approach that fits the existing layout and explain the integration point.

### Preserve interactions

The effect must never block:

- Link and button clicks.
- Form input.
- Text selection.
- Hover states.
- Scrolling.
- Drag interactions.
- Menus or dialogs.

Listen for pointer movement on the appropriate page or section target without placing an interactive canvas above the content.

## 5. Shared pointer input

Use one shared pointer tracker for both layers.

Track:

- Current position.
- Previous position.
- Movement distance.
- Velocity.
- Timestamp.
- Pointer type.
- Whether the pointer is inside the active region.

Convert coordinates correctly for each canvas.

Normalize fluid coordinates according to the simulation’s coordinate system. Keep bubble positions in CSS pixels.

On pointer leave, window blur, or re-entry:

- Reset the previous position.
- Do not create a long streak across the page.
- Do not inject a large artificial velocity spike.

Clamp extreme deltas caused by dropped frames or sudden pointer jumps.

Keep event listeners passive where appropriate.

## 6. Fluid configuration

Centralize the simulation parameters.

The reference website’s inspected JavaScript contained these settings. Use them as a starting point only; their behavior depends on the chosen implementation:

- SIM_RESOLUTION: 128
- DYE_RESOLUTION: 1440
- DENSITY_DISSIPATION: 0.5
- VELOCITY_DISSIPATION: 3
- PRESSURE: 0.1
- PRESSURE_ITERATIONS: 20
- CURL: 3
- SPLAT_RADIUS: 0.2
- SPLAT_FORCE: 6000
- SHADING: true
- COLOR_UPDATE_SPEED: 10

Expose equivalent options for:

- Simulation resolution.
- Dye resolution.
- Trail persistence.
- Velocity decay.
- Swirl strength.
- Injection radius.
- Injection force.
- Color change rate.
- Overall opacity.
- Quality preset.
- Enabled/disabled state.

Do not assume these values are directly interchangeable between unrelated fluid libraries.

Tune the result so it is colorful and clearly visible without overpowering my page content.

## 7. Bubble labels

Use this editable default list:

- JS
- React
- Next.js
- Node.js
- React Native
- Mobile Apps
- TypeScript

Keep the list in configuration, not hardcoded throughout the renderer.

Prevent the same label from appearing repeatedly in immediate succession. A shuffled label queue is acceptable.

Approximately 40% of spawned bubbles should contain a label. The rest should remain plain colored circles.

## 8. Bubble spawning

Spawn particles based primarily on pointer travel distance, with a time limit to control density.

Starting values:

- Spawn distance: approximately 24 CSS pixels.
- Minimum spawn interval: approximately 60 milliseconds.
- Maximum active particles on desktop: 70.
- Maximum active particles on mobile: 30.
- Lifetime: approximately 1,800–3,000 milliseconds.

Interpolate spawn locations along longer pointer segments so a fast movement does not create disconnected clusters.

Limit the number of particles spawned per frame. Do not create a burst of hundreds of particles after a stalled frame.

Do not continuously create bubbles when the pointer is stationary.

When the limit is reached, recycle or remove the oldest particle.

## 9. Bubble appearance

Use true circular shapes.

### Plain circles

- Radius: approximately 10–24 CSS pixels.
- Soft translucent fill.
- Optional faint outline.
- No text.
- No heavy shadow.

### Labeled circles

- Radius: approximately 30–52 CSS pixels, adjusted for text.
- Slightly stronger fill than plain circles.
- Readable text with sufficient contrast.
- A subtle outline if needed.
- No excessive glass shine or neon glow.

Measure text using `measureText`.

Long labels should fit comfortably inside the circle:

- “React Native” can use two lines.
- “Mobile Apps” can use two lines.
- Short labels such as “JS” remain centered on one line.

Use the project’s existing font where practical. Wait for font availability or refresh text measurements when it loads.

Text should generally be around 12–14 CSS pixels. Do not shrink it into unreadability.

Ensure initial placement does not clip the label against viewport or section edges.

## 10. Bubble motion

For each particle, store:

- Position.
- Velocity.
- Radius.
- Label.
- Color.
- Birth time or age.
- Lifetime.
- Optional drift seed.

Suggested behavior:

- Start at approximately 75–85% of final size.
- Reach full size over about 150–250 milliseconds.
- Inherit a restrained amount of pointer momentum.
- Add gentle upward or sideways drift.
- Apply drag so motion settles.
- Fade in quickly.
- Fade out during the final 30–40% of its lifetime.

Keep text upright. Do not spin labels or deform them with the fluid shader.

Prefer sampling the fluid velocity field if the chosen engine exposes an efficient method. Do not read GPU pixels back every frame merely to move bubbles.

If efficient velocity sampling is unavailable, use pointer momentum and a smooth procedural drift approximation. Keep this distinction clear in the implementation notes.

## 11. Color coordination

Use a shared color generator for fluid injections and bubble creation.

Starting palette:

- Teal: #329696
- Green: #3E9858
- Purple: #856ED9
- Pink: #B95F9D
- Gold: #C19433
- Blue: #0171E3

Transition between colors smoothly.

A bubble spawned at a given location should use a related color to the fluid injected at that moment.

Avoid choosing completely unrelated random colors independently for the two layers.

Respect the existing page theme:

- On light backgrounds, use soft but visible color.
- On dark backgrounds, adjust opacity and label contrast.
- Preserve the project’s current theme-switching behavior.
- Do not force the whole application to a white background.

These colors are a design starting point, not a verified copy of the reference’s complete fluid palette.

## 12. Rendering quality and performance

Separate CSS dimensions from drawing-buffer dimensions.

- Calculate canvas size from its actual container.
- Cap device pixel ratio, initially at 1.5–2.
- Give WebGL simulation resolution its own quality setting.
- Avoid allocating large textures on every resize event.
- Resize or rebuild resources only when dimensions materially change.

Use a coordinated frame loop with this general order:

1. Read accumulated pointer input.
2. Inject fluid color and velocity.
3. Spawn bubbles.
4. Advance the fluid simulation.
5. Update particle positions and lifetimes.
6. Render fluid.
7. Render circles and labels.

Keep allocations out of the hot path where practical.

Do not use React state for particle arrays, pointer coordinates, or frame counters.

Provide quality presets, for example:

- High: full desktop effect.
- Medium: reduced dye resolution and particle count.
- Low: lightweight simulation or bubbles-only fallback.

Treat exact resolution values as tunable. Profile the implemented engine rather than assuming higher resolution always looks better.

Target smooth rendering on typical laptops. Reduce quality on slower devices without repeatedly switching presets.

## 13. Mobile and touch behavior

The desktop cursor experience is primary.

On touch devices:

- Preserve normal scrolling.
- Do not apply `touch-action: none` to the entire page.
- Do not call `preventDefault` on ordinary page touch movement.
- Optionally create a restrained burst on touch or a short trail during suitable interactions.
- Use a lower quality preset.
- Reduce particle count and fluid resolution.
- Avoid expensive continuous background activity.

The website must remain comfortable to use with one finger.

## 14. Accessibility and user control

Honor `prefers-reduced-motion`.

When reduced motion is enabled:

- Disable continuous fluid and drifting particles.
- Keep the existing page fully functional.
- Do not run an automatic demonstration loop.

Provide a small pause/resume control only if it can be integrated cleanly into the existing design or settings. Do not add a large toolbar.

The control must:

- Be keyboard accessible.
- Have a clear accessible name.
- Expose its state appropriately.
- Pause both effect layers together.

Keep the canvases decorative and hidden from screen readers.

## 15. Failure handling

The effect must never crash the page.

Before initialization:

- Check whether a WebGL context exists.
- Check required extensions and framebuffer support.
- Validate shader compilation and program linking.
- Handle initialization failures.

If WebGL is unavailable:

- Show a lightweight Canvas 2D bubble trail, or disable the effect.
- Keep all existing content visible and usable.
- Avoid repeatedly attempting failed initialization.

Handle WebGL context loss and restoration safely. Rebuild resources only when appropriate.

Do not call methods such as `getExtension` on a null context.

## 16. Lifecycle and cleanup

Create a clean engine lifecycle, such as:

- initialize
- resize
- updatePointer
- start
- pause
- resume
- destroy

On unmount:

- Cancel animation frames.
- Remove pointer and visibility listeners.
- Disconnect observers.
- Release textures, framebuffers, buffers, shaders, and programs.
- Clear particle references.
- Remove any engine-created DOM nodes.

Ensure React Strict Mode does not produce duplicate listeners, duplicate canvases, or multiple render loops.

Pause when the document is hidden. Reset frame timing on resume to prevent a large simulation jump.

Stop or idle the loop once the visible effect has dissipated, and restart it on new interaction.

## 17. Suggested code organization

Adapt names and paths to my existing project rather than imposing a new folder structure.

Suggested responsibilities:

- `CursorEffects`: integration component and shared lifecycle.
- `fluidEngine`: WebGL initialization, simulation, and rendering.
- `bubbleEngine`: particle spawning, updating, and drawing.
- `pointerTracker`: shared pointer input.
- `cursorEffectsConfig`: colors, labels, density, timing, and quality.
- Optional pause control using the existing UI system.

Keep the effect isolated from portfolio content so I can disable it without changing the page.

Expose simple options such as:

- enabled
- labels
- palette
- labelProbability
- maxParticles
- particleLifetime
- spawnDistance
- fluidOpacity
- quality
- respectReducedMotion

## 18. Verification

Verify the actual implementation in the running project.

Check that:

- Cursor movement creates a flowing fluid trail.
- Technology bubbles appear within that trail.
- Labels remain readable.
- Colors are coordinated.
- Fast movement does not generate excessive particles.
- Leaving and re-entering does not draw a giant streak.
- Buttons, links, inputs, and text selection still work.
- Existing page layout remains unchanged.
- Navigation does not duplicate the effect.
- Resize and orientation changes work.
- Touch scrolling remains normal.
- Reduced-motion preferences are respected.
- Pause/resume works if included.
- WebGL failure leaves the website usable.
- React Strict Mode does not create duplicate animation loops.
- There are no new console errors or obvious resource leaks.

## 19. Final delivery

Implement the changes directly in my existing project.

When finished, provide:

- A concise summary of the effect.
- The files changed.
- Any dependency added and why it was necessary.
- The configuration file where I can change labels, colors, density, size, and lifetime.
- Any license attribution required.
- What was verified.
- Any remaining limitations.

Deliver a working implementation, not only an explanation, a standalone demo, or a replacement portfolio.