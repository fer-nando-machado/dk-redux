import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { Position } from "./Position";
import "./Ladder.scss";

export type Ladder = Position & {
  height: number;
};

export type LadderFactory = {
  ladders: Ladder[];
};

const Ladder: React.FC<Ladder> = ({ x, y, height }) => {
  if (!height) return <></>;
  return (
    <div
      className="Ladder Block"
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
      {ladderFactory.ladders.map((l, index) => (
        <Ladder {...l} key={index} />
      ))}
    </>
  );
};
