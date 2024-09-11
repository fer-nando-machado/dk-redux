import { Block } from "./Block";
import { Ladder } from "./Ladder";
import { Platform } from "./Platform";

export type Position = {
  x: number;
  y: number;
};

export const addPositionWithinTolerance = (
  positions: Position[],
  current: Position
): Position[] => {
  if (positions.length === 0) return [current];

  const last = positions[positions.length - 1];
  if (
    Math.abs(current.x - last.x) > thickness.x ||
    Math.abs(current.y - last.y) > thickness.y
  ) {
    return [...positions, current];
  }
  return positions;
};

const boundaries: { min: Position; max: Position } = {
  min: { x: -5, y: -50 },
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
        onAir: false,
        platformId: platform.id,
      };
      return updated;
    }
  }

  return {
    ...position,
    onAir: true,
  };
};

const isOnPlatform = (position: Position, platform: Platform): boolean => {
  if (!platform.length) return false;

  const relativeX = position.x - platform.x;
  const relativeY = position.y - platform.y;

  return (
    relativeX >= -thickness.x &&
    relativeX <= platform.length &&
    relativeY >= -thickness.y &&
    relativeY <= thickness.y
  );
};

export const checkLadders = (
  position: Position,
  ladders: Ladder[]
): Ladder | null => {
  for (const ladder of ladders) {
    if (isOnLadder(position, ladder)) {
      return ladder;
    }
  }
  return null;
};

const isOnLadder = (position: Position, ladder: Ladder): boolean => {
  if (!ladder.height) return false;

  const relativeX = position.x - ladder.x;
  const relativeY = position.y - ladder.y;

  return (
    relativeX >= -thickness.x &&
    relativeX <= thickness.x &&
    relativeY >= thickness.y &&
    relativeY <= ladder.height + thickness.y
  );
};

export const checkCollision = (
  position: Position,
  target: Position,
  tolerance: Position = { x: 25, y: 25 }
): boolean => {
  const relativeX = position.x - target.x;
  const relativeY = position.y - target.y;

  return (
    relativeX >= -tolerance.x &&
    relativeX <= tolerance.x &&
    relativeY >= -tolerance.y &&
    relativeY <= tolerance.y
  );
};

const thickness: Position = {
  x: 25,
  y: 13,
};
