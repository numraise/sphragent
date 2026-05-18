# Changelog

## Unreleased

- Documented the current split between script-backed features and pure gameplay behavior
- Added release-planning notes for a possible script-free add-on path or any build that requires experimental features

## 1.5.0 - 2026-05-17

- Reworked SH locomotion to use flying/hover navigation instead of gravityless ground walking
- Restored proactive target pursuit with `move_towards_target`
- Restored explicit target retention radius for hostile-mob combat
- Promoted the native combat path as the reliable Education-compatible baseline

## 1.5.1 - 2026-05-18

- Moved the live follow/combat loop before optional chat-command registration
- Guarded pre-release chat events so an unavailable chat API no longer prevents HP refresh, follow, fight pulse, or light mode loops
- Added an after-chat fallback when before-chat is unavailable

## 1.6.0 - 2026-05-18

- Removed constant combat particles; attack effects now appear only while striking a hostile mob
- Added directional hit particles from SH toward its target
- Added hurt knockback plus a temporary red name flash when SH is damaged
- Lowered SH follow position to foot level
- Removed look-at-player behavior so SH no longer turns toward the player when watched

## 1.6.1 - 2026-05-18

- Decoupled SH follow position from the player's camera direction so it no longer appears to dodge the player's gaze
- Kept SH orientation aligned with the owner's facing direction
- Added `player` to SH type families so hostile mobs that target players can also choose SH

## 1.7.0 - 2026-05-18

- Made the logo/front face turn toward the owner rather than following camera direction
- Replaced `player.say()` command bridging with `scriptevent` commands from the MakeCode extension
- Added script-event handling for `fight`, `heal`, `defend`, and `light`

## 1.7.1 - 2026-05-18

- Restored Member-safe MakeCode control blocks by sending `#sphr ...` chat messages instead of operator-only `scriptevent` commands
- Kept the hardened chat listeners so mode changes can update the SH name tag live

## 1.8.0 - 2026-05-18

- Added the `Hero Core` custom item
- Hero Core interactions heal SH, restore Strength, refresh light, and cycle `FIGHT → DEFEND → HEAL`
- Documented Hero Core as the recommended Member-safe control path in Minecraft Education

## 1.9.0 - 2026-05-18

- Reduced HEAL mode from full restore to small periodic healing
- Added distinct mode textures for `FIGHT`, `DEFEND`, and `HEAL`

## 2.0.0 - 2026-05-18

- Gave `DEFEND` a real gameplay identity: nearby hostile mobs are pushed back from the owner
- Added a short Resistance buff to the owner while SH is in `DEFEND`

## 2.1.0 - 2026-05-18

- Lowered the SH name display by one block
- Increased DEFEND pushback and strengthened the owner Resistance effect
- Added light sound feedback for attacks, damage taken, and healing

## 2.2.0 - 2026-05-18

- Upgraded `sync-world-packs.ps1` to update world pack references automatically
- Lowered SH itself so its name tag appears lower in play
- Increased DEFEND knockback strength and added visible knockback particles

## 2.3.0 - 2026-05-18

- Switched DEFEND knockback to the legacy `@minecraft/server` 1.x call signature actually used by this pack
- Added visible owner particles during DEFEND to confirm the mode is active
- Lowered SH collision height so the built-in name tag renders closer to the model

## 2.3.1 - 2026-05-18

- Anchored SH follow height to the player's foot level
- Added a command-based Resistance fallback in DEFEND mode for Minecraft Education runtime compatibility

## 2.4.0 - 2026-05-18

- Changed starting Strength from `100` to `10`
- Added `Hero HP Chip`, `Hero Strength Chip`, and `Hero Light Chip`
- Added item-driven upgrades for HP, Strength, and light level

## 1.4.0 - 2026-05-17

- Bumped behavior/resource pack versions so Minecraft imports the update as a new release
- Moved baseline health, attack, and hostile-mob combat into always-on entity components
- Renamed the localized entity display name to `SH`
- Kept script-backed features separate from the stable native behavior path

## 1.4.1 - 2026-05-17

- Added visible version numbers to in-game pack names to make duplicate imports obvious
- Renamed pack labels to shorter `SH Agent ...` names

## 1.3.1 - 2026-05-17

- Reworked runtime state handling to avoid fragile dynamic-property behavior
- Shortened hero name display to `SH`
- Added scripted combat fallback against nearby hostile mobs
- Added spin and combat particles during fights
- Reworked light mode to place invisible light blocks via script commands

## 1.3.0 - 2026-05-17

- Made SuperHero Agent float beside its owner
- Reused the existing hero when a new egg is placed and teleported it across dimensions
- Added live `HP` and `STR` display in the name tag
- Added MakeCode command blocks for fight, heal player, defend, and light mode
- Added light mode with gradual Strength drain

## 1.2.2 - 2026-05-17

- Added Minecraft target metadata expected by MakeCode extensions
- Added `builder` dependency plus `test.ts` and `tsconfig.json`

## 1.2.1 - 2026-05-17

- Moved MakeCode extension entry files to the repository root
- Fixed direct GitHub URL import in MakeCode

## 1.2.0 - 2026-05-17

- Replaced RoboTNT concept with SuperHero Agent
- Added one-hero-per-player ownership flow
- Added owner name display above the hero
- Added hostile-mob defense behavior
- Added health, healing items, and multi-stage upgrades
- Added Minecraft Education 1.21.133 targeting
- Added Member-safe MakeCode extension
- Reorganized repository for GitHub publishing
