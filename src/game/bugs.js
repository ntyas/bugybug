export const BUG_SIZE = 32;
export const HIT_SLOP = 14;
export const HIT_SIZE = BUG_SIZE + HIT_SLOP * 2;
export const SPAWN_INTERVAL_MS = 680;
export const BUG_LIFETIME_MS = 2300;
export const MAX_BUGS = 4;
export const ROUND_SECONDS = 60;

const MIN_SPEED = 110;
const SPEED_RANGE = 50;

export function createBug(maxX, maxY, now) {
  const speed = MIN_SPEED + Math.random() * SPEED_RANGE;
  const angle = Math.random() * Math.PI * 2;

  return {
    id: crypto.randomUUID(),
    x: Math.random() * maxX,
    y: Math.random() * maxY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    born: now,
  };
}

export function stepBug(bug, dt, maxX, maxY) {
  let x = bug.x + bug.vx * dt;
  let y = bug.y + bug.vy * dt;
  let vx = bug.vx;
  let vy = bug.vy;

  if (x < 0) {
    x = 0;
    vx = Math.abs(vx);
  } else if (x > maxX) {
    x = maxX;
    vx = -Math.abs(vx);
  }

  if (y < 0) {
    y = 0;
    vy = Math.abs(vy);
  } else if (y > maxY) {
    y = maxY;
    vy = -Math.abs(vy);
  }

  return { ...bug, x, y, vx, vy };
}
