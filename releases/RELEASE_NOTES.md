# Release notes

## SuperHero Agent 1.3.1

Ready-to-import files:

- `RaiseSuperHeroAgent.mcaddon`
- `SuperHeroAgent_BP.mcpack`
- `SuperHeroAgent_RP.mcpack`

Highlights:

- one personal hero per player
- owner name displayed above the hero
- attacks hostile mobs around the owner
- heals and upgrades through normal gameplay items
- shows live `HP` and `STR`
- supports fight, defend, heal-player, and light modes through the companion MakeCode extension
- built for Minecraft Education 1.21.133

Implementation note:

- Version 1.3.1 is script-backed. Ownership, one-hero enforcement, live labels, cross-dimension return behavior, MakeCode-triggered modes, and light mode currently rely on the behavior-pack script.
- If a future release becomes pure add-on / gameplay only, these notes must be revised to remove any script-only promises that are not preserved.
- If a future release requires Script API or other experimental world features, list those required settings here before shipping.

Before classroom use, test:

1. add-on import
2. automatic ownership assignment
3. one-agent limit
4. combat behavior
5. healing items
6. upgrade items
7. live `HP` / `STR` display
8. fight, defend, heal-player, and light modes
