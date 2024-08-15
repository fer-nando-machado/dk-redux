import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useIntervalFPS } from "../Hooks/useInterval";
import useKeyboard from "../Hooks/useKeyboard";
import Controller from "./Controller";
import Lady from "./Lady";
import DeutschBox from "./DeutschBox";
import Dog from "./Hunt/Dog";
import { setPlayer } from "../System/RosterSlice";
import { ROSTER, Features } from "../System/Roster";
import { Block } from "../Level/Block";
import { moveJumpman } from "./JumpmanSlice";
import "./Jumpman.scss";

export type Jumpman = Block & {
  jumpingSpeed: number;
  climbingSpeed: number;
  walkingSpeed: number;
};

const PLAYER: Features = {
  code: "M",
  touch: false,
};
ROSTER[PLAYER.code] = PLAYER;

export const Jumpman: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.roster);
  const { gravity } = useSelector((state: RootState) => state.options);

  useIntervalFPS(() => {
    if (jumpman.climbingSpeed || jumpman.jumpingSpeed > 0) return;
    dispatch(
      moveJumpman({
        x: 0,
        y: gravity ? -3 : 0,
      })
    );
  });

  useKeyboard({
    key: PLAYER.code,
    onKeyDown: () => dispatch(setPlayer(PLAYER.code)),
  });

  return (
    <div
      className={`Player Block Jumpman ${current} ${jumpman.direction}`}
      style={{
        left: jumpman.x,
        bottom: jumpman.y,
      }}
    >
      {!ROSTER[current]?.touch && <Controller />}
      <DeutschBox />
      <Dog />
      <Lady />
    </div>
  );
};
