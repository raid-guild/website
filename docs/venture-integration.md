# Venture Beyond integration

Design and Figma asset handoff: Luis Blanco (Louchi), https://estudioblanco.org.

Source: https://github.com/luisblancoach/website/tree/handoff/venture-beyond-dekan
Imported tip: a195359. All seven original commits are retained as merge ancestry,
including their original author information. HANDOFF.md is the original handoff;
this document records subsequent integration decisions rather than rewriting it.

Integration decisions:
- Use self-hosted Afacad Flux with CSS slants instead of the missing Grinder cuts.
  Keep Ubuntu body and Ubuntu Mono supporting type from the handoff.
- Preserve the local foliage front door and direct inquiry route.
- Include Talent & Placement as a proposed spear; keep the handbook accessible.
- Retain the supplied illustrations, palettes, icons, portraits and video scenes.
- Make section sizing responsive rather than enforcing Figma heights when content grows.

Clean scene exports supplied by Louchi in Assets.zip on 2026-09-09:
- Video/wind.mp4 → hero-light.mp4 (2200 × 940).
- Video/forest.mp4 → hero-dark.mp4 (2184 × 948).
- Video/Animated Scene.mp4 → manifesto.mp4 (2200 × 940).
These replace the previous preview videos with background-only artwork. Web copies
use H.264 CRF 23, yuv420p and fast-start metadata, with audio removed. Posters are
extracted from the matching exports. Playback pauses offscreen, in hidden tabs,
and for reduced-motion preferences; the existing hover discovery layer is retained.
Statistical and portfolio copy from the design remains mockup content requiring
editorial verification before release. No Grinder files are bundled or required.
