import { Block } from "./Block";
import { Platform } from "./Platform";

export type Position = {
  x: number;
  y: number;
};

const boundaries: { min: Position; max: Position } = {
  min: { x: -5, y: -5 },
  max: { x: 500 - 20, y: 750 - 15 },
};

export const getRandomX = (): number => {
  return (
    Math.floor(Math.random() * (boundaries.max.x - boundaries.min.x + 1)) +
    boundaries.min.x
  );
};

export const checkBoundaries = (position: Block): Block => {
  return {
    ...position,
    x: Math.max(boundaries.min.x, Math.min(position.x, boundaries.max.x)),
    y: Math.max(boundaries.min.y, Math.min(position.y, boundaries.max.y)),
  };
};

export const checkPlatforms = (
  position: Block,
  platforms: Platform[]
): Block => {
  for (const platform of platforms) {
    if (isOnPlatform(position, platform)) {
      const updated: Block = {
        ...position,
        y: platform.y + thickness.y,
        isJumping: false,
      };
      return updated;
    }
  }

  return {
    ...position,
    isJumping: true,
  };
};

const isOnPlatform = (position: Position, platform: Platform): boolean => {
  if (!platform.length) return false;

  const currentX = position.x - platform.x;
  const currentY = position.y - platform.y;

  return (
    currentX >= -thickness.x &&
    currentX <= platform.length &&
    currentY >= -thickness.y &&
    currentY <= thickness.y
  );
};

const thickness: Position = {
  x: 25,
  y: 12.5,
};
