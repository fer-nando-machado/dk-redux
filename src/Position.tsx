export interface Position {
  x: number;
  y: number;
}

export const Boundaries: { min: Position; max: Position } = {
  min: { x: 0, y: 0 },
  max: { x: 500, y: 500 },
};

export const isWithinBoundaries = (position: Position): boolean => {
  if (
    position.x < 0 ||
    position.y < 0 ||
    position.x + 25 > Boundaries.max.x ||
    position.y + 25 > Boundaries.max.y
  )
    return false;

  return true;
};
