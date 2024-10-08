import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { Position } from "./Position";
import "./Ladder.scss";

export type Ladder = Position & {
  id?: number;
  height: number;
  target?: boolean;
};

export type LadderFactory = {
  ladders: Ladder[];
};

const Ladder: React.FC<Ladder> = ({ x, y, height, target }) => {
  if (!height) return null;
  return (
    <div
      className={`Ladder Block ${target ? "Target" : ""}`}
      style={{
        left: x,
        bottom: y,
        height: height,
      }}
    />
  );
};

export const LadderFactory: React.FC = () => {
  const ladderFactory = useSelector((state: RootState) => state.ladderFactory);

  return (
    <>
      {ladderFactory.ladders.map((l) => (
        <Ladder {...l} key={l.id} />
      ))}
    </>
  );
};

export const findClosestLadder = (
  ladders: Ladder[],
  current: Position
): Ladder | null => {
  let closestLadder: Ladder | null = null;
  let minDistance = Infinity;

  for (const ladder of ladders) {
    if (
      ladder.height === 100 &&
      Math.abs(ladder.y - current.y) <= 25 &&
      !ladder.target
    ) {
      const distance = Math.sqrt(
        Math.pow(ladder.x - current.x, 2) + Math.pow(ladder.y - current.y, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestLadder = ladder;
      }
    }
  }

  return closestLadder;
};

export const getRandomLadderIds = (ladders: Ladder[]): number[] => {
  return ladders
    .filter(() => Math.random() < PROBABILITY)
    .map((ladder) => ladder.id!);
};

const PROBABILITY = 0.5;
