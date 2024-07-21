export interface Position {
  x: number;
  y: number;
}

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
