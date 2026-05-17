# Changelog

## Unreleased

- Documented the current split between script-backed features and pure gameplay behavior
- Added release-planning notes for a possible script-free add-on path or any build that requires experimental features

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
