import { Platform } from "./Platform";

export type Position = {
  x: number;
  y: number;
};

export const Boundaries: { min: Position; max: Position } = {
  min: { x: 0, y: 0 },
  max: { x: 500, y: 750 },
};

export const assertWithinBoundaries = (position: Position): Position => {
  return {
    x: Math.max(0, Math.min(position.x, Boundaries.max.x - 25)),
    y: Math.max(0, Math.min(position.y, Boundaries.max.y - 25)),
  };
};

export const isOnPlatform = (
  position: Position,
  platform: Platform
): boolean => {
  const { x, y, length, angle = 0 } = platform;
  if (!length) return false;

  const characterX = position.x - x;
  const characterY = position.y - y;

  const radianAngle = -angle * (Math.PI / 180);
  const rotatedX =
    characterX * Math.cos(radianAngle) - characterY * Math.sin(radianAngle);
  const rotatedY =
    characterX * Math.sin(radianAngle) + characterY * Math.cos(radianAngle);

  return rotatedX >= 0 && rotatedX <= length && rotatedY >= 0 && rotatedY <= 2;
};