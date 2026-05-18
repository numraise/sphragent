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
