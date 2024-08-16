import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { ROSTER, Roster } from "../System/Roster";
import { hasUnlockedLady } from "../Player/Lady";
import { Block } from "./Block";
import "./Goal.scss";

export type Goal = Block & {
  //collectibles []
};

export const Goal: React.FC = () => {
  const goal = useSelector((state: RootState) => state.goal);
  const roster = useSelector((state: RootState) => state.roster);
  const hasLady = hasUnlockedLady();
  const code = hasLady ? getPartner(roster) : "LADY";

  return (
    <div
      className={`Goal Block Jumpman ${code} ${goal.direction}`}
      style={{ left: goal.x, bottom: goal.y }}
    >
      {ROSTER[code]?.weapon}
      <div className="bubble right shadow">help!</div>
    </div>
  );
};

export const getPartner = ({ current, players }: Roster) => {
  const partners = Object.keys(players).filter((code) => code !== current);
  const randomPartner = partners[Math.floor(Math.random() * partners.length)];
  return randomPartner;
};
