import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { ROSTER } from "../System/Roster";
import { getPartner } from "../Player/Lady";
import { Block } from "./Block";
import "./Goal.scss";

export type Goal = Block & {
  reached?: boolean;
  //collectibles []
};

export const Goal: React.FC = () => {
  const goal = useSelector((state: RootState) => state.goal);
  const code = getPartner();

  return (
    <div
      className={`Goal Block Jumpman ${code} ${goal.reached ? "Reached" : ""} ${
        goal.direction
      }`}
      style={{ left: goal.x, bottom: goal.y }}
    >
      {ROSTER[code]?.weapon}
      {goal.reached ? (
        <div className="Heart emoji">❤️</div>
      ) : (
        <div className="bubble right shadow">
          {ROSTER[code]?.help || "HELP!"}
        </div>
      )}
    </div>
  );
};
