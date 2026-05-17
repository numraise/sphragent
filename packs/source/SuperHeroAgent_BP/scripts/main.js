import { world, system } from "@minecraft/server";

const HERO_ID = "mcblock:superhero_agent";

function ownerTagFor(playerName) {
  return "hero_owner_" + playerName.replace(/[^A-Za-z0-9_]/g, "_");
}

function allHeroes() {
  const ids = ["overworld", "nether", "the_end"];
  const result = [];
  for (const id of ids) {
    result.push(...world.getDimension(id).getEntities({ type: HERO_ID }));
  }
  return result;
}

function distanceSquared(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

function nearestPlayer(entity) {
  let best;
  let bestDistance = Number.MAX_VALUE;
  for (const player of world.getAllPlayers()) {
    if (player.dimension.id !== entity.dimension.id) continue;
    const currentDistance = distanceSquared(player.location, entity.location);
    if (currentDistance < bestDistance) {
      best = player;
      bestDistance = currentDistance;
    }
  }
  return bestDistance <= 64 ? best : undefined;
}

function heroOwnedBy(player) {
  const tag = ownerTagFor(player.name);
  return allHeroes().find((hero) => hero.hasTag(tag));
}

function claimHero(hero, player) {
  const existing = heroOwnedBy(player);
  if (existing && existing.id !== hero.id) {
    hero.remove();
    player.sendMessage("You already have one SuperHero Agent.");
    return;
  }

  hero.addTag(ownerTagFor(player.name));
  hero.nameTag = player.name + "'s SuperHero";

  const tameable = hero.getComponent("minecraft:tameable");
  if (tameable) tameable.tame(player);

  player.sendMessage("Your SuperHero Agent is ready.");
}

world.afterEvents.entitySpawn.subscribe((event) => {
  const entity = event.entity;
  if (entity.typeId !== HERO_ID) return;
  system.run(() => {
    const player = nearestPlayer(entity);
    if (player) claimHero(entity, player);
  });
});
