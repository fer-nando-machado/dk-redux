import { Position } from "./Position";

export type Block = Position & {
  direction: "left" | "right";
  isJumping?: boolean;
};
