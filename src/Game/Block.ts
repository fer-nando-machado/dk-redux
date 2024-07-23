import { Position } from "./Position";

type Direction = "left" | "right";

export type Block = Position & {
  direction: Direction;
  isJumping?: boolean;
};

export const flipDirection = (direction: Direction): Direction => {
  return direction === "left" ? "right" : "left";
};
