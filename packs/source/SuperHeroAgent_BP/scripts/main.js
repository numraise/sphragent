import { world, system } from "@minecraft/server";

const HERO_ID = "mcblock:superhero_agent";
const DEFAULT_STRENGTH = 100;
const commandPrefix = "#sphr ";
const strengthByHero = new Map();
const modeByHero = new Map();
const lastLightByHero = new Map();
const lastFollowNoticeByHero = new Map();
const hurtTintUntilByHero = new Map();
let announcedLoaded = false;
let followLoopTick = 0;

function safe(action) {
  try {
    return action();
  } catch {
    return undefined;
  }
}

function tell(player, message) {
  safe(() => player.sendMessage(message));
}

function announceLoaded() {
  if (announcedLoaded) return;
  announcedLoaded = true;
  safe(() => world.sendMessage("\u00a7b[SH] SuperHeroAgent script loaded."));
}

function ownerTagFor(playerName) {
  return "hero_owner_" + playerName.replace(/[^A-Za-z0-9_]/g, "_");
}

function allHeroes() {
  const ids = ["overworld", "nether", "the_end"];
  const result = [];
  for (const id of ids) {
    const heroes = safe(() => world.getDimension(id).getEntities({ type: HERO_ID }));
    if (heroes) result.push(...heroes);
  }
  return result;
}

function heroOwnedBy(player) {
  const tag = ownerTagFor(player.name);
  return allHeroes().find((hero) => hero.hasTag(tag));
}

function getOwner(hero) {
  for (const player of world.getAllPlayers()) {
    if (hero.hasTag(ownerTagFor(player.name))) return player;
  }
  return undefined;
}

function getStrength(hero) {
  if (!strengthByHero.has(hero.id)) strengthByHero.set(hero.id, DEFAULT_STRENGTH);
  return strengthByHero.get(hero.id);
}

function setStrength(hero, value) {
  strengthByHero.set(hero.id, Math.max(0, Math.min(DEFAULT_STRENGTH, Math.floor(value))));
}

function getMode(hero) {
  return modeByHero.get(hero.id) || "fight";
}

function setMode(hero, mode) {
  modeByHero.set(hero.id, mode);
}

function nearestPlayer(entity) {
  let best;
  let bestDistance = Number.MAX_VALUE;
  for (const player of world.getAllPlayers()) {
    if (player.dimension.id !== entity.dimension.id) continue;
    const dx = player.location.x - entity.location.x;
    const dy = player.location.y - entity.location.y;
    const dz = player.location.z - entity.location.z;
    const distance = dx * dx + dy * dy + dz * dz;
    if (distance < bestDistance) {
      best = player;
      bestDistance = distance;
    }
  }
  return bestDistance <= 64 ? best : undefined;
}

function sideLocation(player) {
  return {
    x: player.location.x + 1.4,
    y: player.location.y + 0.15,
    z: player.location.z
  };
}

function updateName(hero, owner) {
  const health = hero.getComponent("minecraft:health");
  const hp = health ? Math.ceil(health.currentValue) : "?";
  const maxHp = health ? Math.ceil(health.effectiveMax ?? health.defaultValue ?? health.currentValue) : "?";
  const nameColor = (hurtTintUntilByHero.get(hero.id) || 0) > followLoopTick ? "\u00a7c" : "\u00a7b";
  hero.nameTag =
    nameColor +
    owner.name +
    "'s SH \u00a77| \u00a7aHP " +
    hp +
    "/" +
    maxHp +
    " \u00a77| \u00a7eSTR " +
    getStrength(hero) +
    " \u00a77| \u00a7d" +
    getMode(hero).toUpperCase();
}

function clearLight(hero) {
  const previous = lastLightByHero.get(hero.id);
  if (!previous) return;
  try {
    previous.dimension.runCommand(
      `setblock ${previous.location.x} ${previous.location.y} ${previous.location.z} air replace light_block`
    );
  } catch {}
  lastLightByHero.delete(hero.id);
}

function placeLight(hero) {
  const location = {
    x: Math.floor(hero.location.x),
    y: Math.floor(hero.location.y),
    z: Math.floor(hero.location.z)
  };
  try {
    hero.dimension.runCommand(
      `setblock ${location.x} ${location.y} ${location.z} light_block ["block_light_level"=15] replace air`
    );
    lastLightByHero.set(hero.id, { dimension: hero.dimension, location });
  } catch {}
}

function nearestMonster(hero, radius) {
  const monsters =
    safe(() =>
      hero.dimension.getEntities({
        location: hero.location,
        maxDistance: radius,
        families: ["monster"]
      })
    ) || [];
  return monsters.find((entity) => entity.typeId !== HERO_ID);
}

function fightPulse(hero) {
  const target = nearestMonster(hero, 6);
  if (!target) return;
  safe(() => {
    const dx = target.location.x - hero.location.x;
    const dy = target.location.y - hero.location.y;
    const dz = target.location.z - hero.location.z;
    const yaw = Math.atan2(-dx, dz) * 180 / Math.PI;
    hero.setRotation({ x: 0, y: yaw + 180 });
    for (let i = 1; i <= 4; i++) {
      hero.dimension.spawnParticle("minecraft:critical_hit_emitter", {
        x: hero.location.x + dx * (i / 5),
        y: hero.location.y + 0.6 + dy * (i / 5),
        z: hero.location.z + dz * (i / 5)
      });
    }
    target.applyDamage(4);
    const rotation = hero.getRotation();
    hero.setRotation({ x: rotation.x, y: rotation.y + 135 });
    hero.dimension.spawnParticle("minecraft:critical_hit_emitter", target.location);
  });
}

function claimHero(hero, player) {
  const existing = heroOwnedBy(player);
  if (existing && existing.id !== hero.id) {
    safe(() => existing.teleport(sideLocation(player), { dimension: player.dimension }));
    safe(() => updateName(existing, player));
    safe(() => hero.remove());
    tell(player, "\u00a7b[SH] Your SH has returned to you.");
    return;
  }

  safe(() => hero.addTag(ownerTagFor(player.name)));
  setStrength(hero, DEFAULT_STRENGTH);
  setMode(hero, "fight");
  const tameable = hero.getComponent("minecraft:tameable");
  if (tameable) safe(() => tameable.tame(player));
  safe(() => hero.teleport(sideLocation(player), { dimension: player.dimension }));
  safe(() => updateName(hero, player));
  tell(player, "\u00a7b[SH] Your SH is ready.");
}

function commandHero(player, command) {
  const hero = heroOwnedBy(player);
  if (!hero) {
    tell(player, "\u00a7b[SH] No SH found.");
    return;
  }

  if (command === "fight") {
    safe(() => hero.triggerEvent("mcblock:fight"));
    setMode(hero, "fight");
    tell(player, "\u00a7b[SH] Fight mode: spinning for monsters.");
  } else if (command === "defend") {
    safe(() => hero.triggerEvent("mcblock:defend"));
    setMode(hero, "defend");
    tell(player, "\u00a7b[SH] Defend mode.");
  } else if (command === "heal") {
    const health = player.getComponent("minecraft:health");
    if (health) safe(() => health.resetToMaxValue());
    tell(player, "\u00a7b[SH] Healed you.");
  } else if (command === "light") {
    safe(() => hero.triggerEvent("mcblock:defend"));
    setMode(hero, "light");
    tell(player, "\u00a7b[SH] Light mode.");
  } else {
    tell(player, "\u00a7b[SH] Commands: fight, defend, heal, light.");
  }
}

function distanceSquared(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

function followOwner(hero, owner) {
  const destination = sideLocation(owner);
  const crossedDimensions = hero.dimension.id !== owner.dimension.id;
  const movedFar = crossedDimensions || distanceSquared(hero.location, destination) > 2.25;
  const oldLocation = hero.location;
  const oldDimension = hero.dimension;

  safe(() => hero.teleport(destination, { dimension: owner.dimension }));
  safe(() => {
    const ownerRotation = owner.getRotation();
    hero.setRotation({ x: 0, y: ownerRotation.y });
  });

  if (!movedFar) return;
  safe(() => oldDimension.spawnParticle("minecraft:totem_particle", oldLocation));
  safe(() => owner.dimension.spawnParticle("minecraft:totem_particle", destination));

  const lastNotice = lastFollowNoticeByHero.get(hero.id) || -1000;
  if (followLoopTick - lastNotice >= 5) {
    tell(owner, "\u00a7b[SH] Following at your side.");
    lastFollowNoticeByHero.set(hero.id, followLoopTick);
  }
}

if (world.afterEvents.worldLoad) {
  world.afterEvents.worldLoad.subscribe(announceLoaded);
}
system.run(announceLoaded);

world.afterEvents.entitySpawn.subscribe((event) => {
  const entity = event.entity;
  if (entity.typeId !== HERO_ID) return;
  system.run(() => {
    const player = nearestPlayer(entity);
    if (player) claimHero(entity, player);
  });
});

safe(() => {
  if (world.afterEvents && world.afterEvents.entityHurt) {
    world.afterEvents.entityHurt.subscribe((event) => {
      const hero = event.hurtEntity;
      if (!hero || hero.typeId !== HERO_ID) return;
      hurtTintUntilByHero.set(hero.id, followLoopTick + 8);

      const source = event.damageSource && event.damageSource.damagingEntity;
      if (source) {
        const dx = hero.location.x - source.location.x;
        const dz = hero.location.z - source.location.z;
        const len = Math.sqrt(dx * dx + dz * dz) || 1;
        safe(() => hero.applyKnockback({ x: dx / len * 1.2, z: dz / len * 1.2 }, 0.35));
      }

      safe(() => hero.dimension.spawnParticle("minecraft:lava_particle", {
        x: hero.location.x,
        y: hero.location.y + 0.8,
        z: hero.location.z
      }));
    });
  }
});

system.runInterval(() => {
  followLoopTick++;
  for (const hero of allHeroes()) {
    const owner = getOwner(hero);
    if (!owner) continue;

    followOwner(hero, owner);
    safe(() => updateName(hero, owner));

    if (getMode(hero) === "fight") {
      clearLight(hero);
      fightPulse(hero);
    } else if (getMode(hero) === "light") {
      clearLight(hero);
      if (getStrength(hero) > 0) {
        placeLight(hero);
        setStrength(hero, getStrength(hero) - 1);
      } else {
        setMode(hero, "defend");
      }
    } else {
      clearLight(hero);
    }
  }
}, 20);

// Register chat controls last, and only when the runtime exposes them.
// In some runtimes chatSend is unavailable; the core follow/combat loop must still run.
safe(() => {
  if (world.beforeEvents && world.beforeEvents.chatSend) {
    world.beforeEvents.chatSend.subscribe((event) => {
      if (!event.message.startsWith(commandPrefix)) return;
      event.cancel = true;
      commandHero(event.sender, event.message.substring(commandPrefix.length).trim());
    });
  } else if (world.afterEvents && world.afterEvents.chatSend) {
    world.afterEvents.chatSend.subscribe((event) => {
      if (!event.message.startsWith(commandPrefix)) return;
      commandHero(event.sender, event.message.substring(commandPrefix.length).trim());
    });
  }
});
