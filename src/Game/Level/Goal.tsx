import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { ROSTER } from "../System/Roster";
import { getLadyOrRandomPartner } from "../Player/Lady";
import { Block } from "./Block";
import "./Goal.scss";

export type Goal = Block & {
  reached?: boolean;
  //collectibles []
};

export const Goal: React.FC = () => {
  const roster = useSelector((state: RootState) => state.roster);
  const goal = useSelector((state: RootState) => state.goal);

  const partner = useMemo(
    () => getLadyOrRandomPartner(roster),
    [roster.current]
  );

  return (
    <div
      className={`Goal Block Jumpman ${partner} ${goal.direction} ${
        goal.reached ? "Reached" : ""
      }`}
      style={{ left: goal.x, bottom: goal.y }}
    >
      {ROSTER[partner]?.weapon}
      {goal.reached ? (
        <div className="Heart emoji">❤️</div>
      ) : (
        <div className="bubble right shadow">
          {ROSTER[partner]?.help || "HELP!"}
        </div>
      )}
    </div>
  );
};
