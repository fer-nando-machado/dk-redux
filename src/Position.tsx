import { Dispatch, SetStateAction, useState } from "react";
import { MarioSize } from "./Mario";

export type Position = {
  x: number;
  y: number;
};

export const Boundaries: { min: Position; max: Position } = {
  min: { x: 0, y: 0 },
  max: { x: 500, y: 500 },
};

export function usePositionState(
  initial: Position
): [Position, Dispatch<SetStateAction<Position>>] {
  const [state, setState] = useState<Position>(initial);

  const setPositionState: Dispatch<SetStateAction<Position>> = (value) => {
    setState((old) => {
      const newValue =
        typeof value === "function"
          ? (value as (old: Position) => Position)(old)
          : value;

      if (!isWithinBoundaries(newValue)) return old;
      return newValue;
    });
  };

  return [state, setPositionState];
}

const isWithinBoundaries = (position: Position): boolean => {
  if (
    position.x < 0 ||
    position.y < 0 ||
    position.x + MarioSize > Boundaries.max.x ||
    position.y + MarioSize > Boundaries.max.y
  )
    return false;

  return true;
};
