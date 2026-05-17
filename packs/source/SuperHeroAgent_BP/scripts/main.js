import { world, system, BlockPermutation } from "@minecraft/server";

const HERO_ID = "mcblock:superhero_agent";
const DEFAULT_STRENGTH = 100;
const LIGHT_BLOCK = "minecraft:light_block_15";
const commandPrefix = "#sphr ";
const lastLightByHero = new Map();

function ownerTagFor(playerName) {
  return "hero_owner_" + playerName.replace(/[^A-Za-z0-9_]/g, "_");
}

function allHeroes() {
  const ids = ["overworld", "nether", "the_end"];
  const result = [];
  for (const id of ids) result.push(...world.getDimension(id).getEntities({ type: HERO_ID }));
  return result;
}

function getOwner(hero) {
  for (const player of world.getAllPlayers()) {
    if (hero.hasTag(ownerTagFor(player.name))) return player;
  }
  return undefined;
}

function getStrength(hero) {
  const value = hero.getDynamicProperty("sphr:strength");
  return typeof value === "number" ? value : DEFAULT_STRENGTH;
}

function setStrength(hero, value) {
  hero.setDynamicProperty("sphr:strength", Math.max(0, Math.min(DEFAULT_STRENGTH, Math.floor(value))));
}

function getMode(hero) {
  const mode = hero.getDynamicProperty("sphr:mode");
  return typeof mode === "string" ? mode : "fight";
}

function setMode(hero, mode) {
  hero.setDynamicProperty("sphr:mode", mode);
}

function heroOwnedBy(player) {
  const tag = ownerTagFor(player.name);
  return allHeroes().find((hero) => hero.hasTag(tag));
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
  const view = player.getViewDirection();
  return {
    x: player.location.x + view.z * 1.4,
    y: player.location.y + 1.35,
    z: player.location.z - view.x * 1.4
  };
}

function updateName(hero, owner) {
  const health = hero.getComponent("minecraft:health");
  const hp = health ? Math.ceil(health.currentValue) : "?";
  const maxHp = health ? Math.ceil(health.effectiveMax) : "?";
  hero.nameTag = owner.name + "'s SuperHero | HP " + hp + "/" + maxHp + " | STR " + getStrength(hero);
}

function clearLight(hero) {
  const previous = lastLightByHero.get(hero.id);
  if (!previous) return;
  try {
    const block = previous.dimension.getBlock(previous.location);
    if (block && block.typeId === LIGHT_BLOCK) block.setType("minecraft:air");
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
    const block = hero.dimension.getBlock(location);
    if (block && block.typeId === "minecraft:air") {
      block.setPermutation(BlockPermutation.resolve(LIGHT_BLOCK));
      lastLightByHero.set(hero.id, { dimension: hero.dimension, location });
    }
  } catch {}
}

function claimHero(hero, player) {
  const existing = heroOwnedBy(player);
  if (existing && existing.id !== hero.id) {
    existing.teleport(sideLocation(player), { dimension: player.dimension });
    updateName(existing, player);
    hero.remove();
    player.sendMessage("Your SuperHero Agent has returned to you.");
    return;
  }

  hero.addTag(ownerTagFor(player.name));
  setStrength(hero, DEFAULT_STRENGTH);
  setMode(hero, "fight");
  const tameable = hero.getComponent("minecraft:tameable");
  if (tameable) tameable.tame(player);
  hero.teleport(sideLocation(player), { dimension: player.dimension });
  updateName(hero, player);
  player.sendMessage("Your SuperHero Agent is ready.");
}

function commandHero(player, command) {
  const hero = heroOwnedBy(player);
  if (!hero) {
    player.sendMessage("No SuperHero Agent found.");
    return;
  }

  if (command === "fight") {
    hero.triggerEvent("mcblock:fight");
    setMode(hero, "fight");
    player.sendMessage("SuperHero Agent: fight mode.");
  } else if (command === "defend") {
    hero.triggerEvent("mcblock:defend");
    setMode(hero, "defend");
    player.sendMessage("SuperHero Agent: defend mode.");
  } else if (command === "heal") {
    const health = player.getComponent("minecraft:health");
    if (health) health.resetToMaxValue();
    player.sendMessage("SuperHero Agent healed you.");
  } else if (command === "light") {
    hero.triggerEvent("mcblock:defend");
    setMode(hero, "light");
    player.sendMessage("SuperHero Agent: light mode.");
  }
}

world.afterEvents.entitySpawn.subscribe((event) => {
  const entity = event.entity;
  if (entity.typeId !== HERO_ID) return;
  system.run(() => {
    const player = nearestPlayer(entity);
    if (player) claimHero(entity, player);
  });
});

world.beforeEvents.chatSend.subscribe((event) => {
  if (!event.message.startsWith(commandPrefix)) return;
  event.cancel = true;
  const command = event.message.substring(commandPrefix.length).trim();
  commandHero(event.sender, command);
});

system.runInterval(() => {
  for (const hero of allHeroes()) {
    const owner = getOwner(hero);
    if (!owner) continue;

    hero.teleport(sideLocation(owner), { dimension: owner.dimension });
    updateName(hero, owner);

    if (getMode(hero) === "light") {
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
