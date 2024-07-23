import { Platform } from "./Platform";

// might refactor to class
export type Position = {
  x: number;
  y: number;
};

const boundaries: { min: Position; max: Position } = {
  min: { x: -5, y: -5 },
  max: { x: 500 - 20, y: 750 - 15 },
};

export const checkBoundaries = (position: Position): Position => {
  return {
    x: Math.max(boundaries.min.x, Math.min(position.x, boundaries.max.x)),
    y: Math.max(boundaries.min.y, Math.min(position.y, boundaries.max.y)),
  };
};

export const checkPlatforms = (position: Position, platforms: Platform[]) => {
  for (const platform of platforms) {
    if (isOnPlatform(position, platform)) {
      return true;
    }
  }
  return false;
};

const isOnPlatform = (position: Position, platform: Platform): boolean => {
  if (!platform.length) return false;

  const currentX = position.x - platform.x;
  const currentY = position.y - platform.y;
  const isOnPlatform =
    currentX >= -thickness.x &&
    currentX <= platform.length &&
    currentY >= -thickness.y &&
    currentY <= thickness.y;

  return isOnPlatform;
};

const thickness: Position = {
  x: 25,
  y: 25 / 2,
};
