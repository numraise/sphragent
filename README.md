# SuperHero Agent for Minecraft Education

SuperHero Agent is a member-friendly companion add-on and MakeCode extension for Minecraft Education.  
Each player gets one personal hero that follows them, protects them from hostile mobs, can be injured, can be healed, and grows stronger through in-game items.

## What it does

- one SuperHero Agent per player
- owner's player name shown above the hero
- automatically protects the owner and attacks nearby hostile mobs
- floats beside its owner and returns across dimensions when a new egg is placed
- can be hurt and can die
- shows live `HP` and `STR` values beside its short name `SH`
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

## MakeCode command blocks

- `SuperHero Agent fight`
- `SuperHero Agent heal player`
- `SuperHero Agent defend`
- `SuperHero Agent light mode`

`light mode` creates local illumination around the hero while gradually draining Strength.

When fighting, SH now spins and emits combat particles so its state is visible at a glance.

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

To import the MakeCode extension:

1. Open **Extensions**
2. Choose **GitHub URL**
3. Paste `https://github.com/numraise/sphragent`

The extension entry files live at the repository root so the plain GitHub URL works directly in MakeCode.

## Notes

- The current release uses a small behavior-pack script for ownership, the one-hero-per-player rule, live `HP` / `STR` name tags, cross-dimension return behavior, MakeCode-triggered modes, and light mode.
- Core combat, healing, and upgrade interactions are defined as normal add-on gameplay behavior.
- If a future release removes the script dependency, expect the feature list to be reviewed: some convenience features may need to change unless they can be rebuilt with normal add-on components alone.
- If a future release still depends on Script API or other experimental capabilities, the release notes should call that out before classroom rollout and list the required world settings.
- The hero's current visual style is intentionally simple and easy to reskin later.
- Runtime testing inside Minecraft Education is still recommended before classroom rollout.

## Compatibility planning

Two release paths are being considered:

| Path | What it means for users |
| --- | --- |
| Pure add-on / gameplay only | No script-dependent setup; documentation should only promise features that work from behavior and resource packs alone. |
| Script-backed release | Keeps richer automation, but the install guide and release notes must clearly list any required experimental features or world settings. |

Before publishing either path, verify the final pack in a fresh world and update the feature list, quick start steps, and release notes to match what players can actually use.

## Thai guide

See [`docs/README_TH.md`](./docs/README_TH.md)
