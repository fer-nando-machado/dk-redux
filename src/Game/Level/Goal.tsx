import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { Block } from "./Block";
import "./Goal.scss";

export type Goal = Block & {
  //collectibles []
};

export const Goal: React.FC = () => {
  const goal = useSelector((state: RootState) => state.goal);

  return (
    <div
      className={`Goal Block Jumpman LADY ${goal.direction}`}
      style={{ left: goal.x, bottom: goal.y }}
    >
      <div className="Hat" />
      <div className="bubble right shadow">help!</div>
    </div>
  );
};
