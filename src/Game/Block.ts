import { Position } from "./Position";
import "./Block.scss";

export const LEFT = "left";
export const RIGHT = "right";
type Direction = "left" | "right";

// TODO TURN into component (render target etc inside)
export type Block = Position & {
  direction: Direction;
  isJumping: boolean; // change to onAir
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

export const getRandomDirection = (): Direction => {
  return Math.random() < 0.5 ? "left" : "right";
};

export const flipDirection = (direction: Direction): Direction => {
  return direction === LEFT ? RIGHT : LEFT;
};
