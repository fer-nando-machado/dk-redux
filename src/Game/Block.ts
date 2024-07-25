import { Position } from "./Position";

export const LEFT = "left";
export const RIGHT = "right";
type Direction = "left" | "right";

export type Block = Position & {
  direction: Direction;
  isJumping: boolean;
};

export const isDirectionLeft = (direction: Direction): boolean => {
  return direction === LEFT;
};

export const isDirectionRight = (direction: Direction): boolean => {
  return direction === RIGHT;
};

export const getDirection = (x: number): Direction | undefined => {
  return x < 0 ? LEFT : x > 0 ? RIGHT : undefined;
};

export const flipDirection = (direction: Direction): Direction => {
  return direction === LEFT ? RIGHT : LEFT;
};