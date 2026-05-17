# SuperHero Agent for Minecraft Education

SuperHero Agent is a member-friendly companion add-on for Minecraft Education.  
Each player gets one personal hero that follows them, protects them from hostile mobs, can be injured, can be healed, and grows stronger through in-game items.

## What it does

- one SuperHero Agent per player
- owner's player name shown above the hero
- automatically protects the owner and attacks nearby hostile mobs
- can be hurt and can die
- heals with `bread`, `cooked beef`, and `golden apple`
- upgrades with `iron ingot`, `gold ingot`, and `diamond`
- designed for Minecraft Education `1.21.133`
- includes a Member-safe MakeCode extension for classroom flow blocks

## Quick start

1. Download [`RaiseSuperHeroAgent.mcaddon`](./releases/RaiseSuperHeroAgent.mcaddon)
2. Open it with Minecraft Education
3. Add the pack to a world
4. Spawn a SuperHero Agent near a player
5. The nearest player becomes its owner automatically

## Gameplay guide

| Item | Effect |
| --- | --- |
| `bread` | heal 4 |
| `cooked beef` | heal 8 |
| `golden apple` | heal 16 |
| `iron ingot` | upgrade to Level 2 |
| `gold ingot` | upgrade to Level 3 |
| `diamond` | upgrade to Level 4 |

## Repository layout

```text
docs/                         Thai documentation
extensions/RaiseSuperHeroAgent/  MakeCode extension source
packs/source/                 Behavior/resource pack source
releases/                     Ready-to-import mcaddon/mcpack files
```

## MakeCode extension

The MakeCode extension is intentionally Member-safe.  
It avoids slash commands and focuses on classroom flow:

- show controls
- explain the power path
- announce missions
- show tips
- countdowns
- checkpoints
- victory messages

To import it into MakeCode after publishing this repository:

1. Open **Extensions**
2. Choose **GitHub URL**
3. Paste the repository URL

## Notes

- Ownership and the one-hero-per-player rule are handled by a small script in the behavior pack.
- The hero's current visual style is intentionally simple and easy to reskin later.
- Runtime testing inside Minecraft Education is still recommended before classroom rollout.

## Thai guide

See [`docs/README_TH.md`](./docs/README_TH.md)
