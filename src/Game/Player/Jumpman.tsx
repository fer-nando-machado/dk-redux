import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useIntervalFPS } from "../Hooks/useInterval";
import useKeyboard from "../Hooks/useKeyboard";
import Controller from "./Controller";
import Star from "./Star";
import Lady from "./Lady";
import DeutschBox from "./DeutschBox";
import Dog from "./Hunt/Dog";
import { Song } from "../Hooks/useMusic";
import { setPlayer } from "../System/RosterSlice";
import { ROSTER, Features } from "../System/Roster";
import { Block } from "../Level/Block";
import { moveJumpman, setJumpman } from "./JumpmanSlice";
import "./Jumpman.scss";

export type Jumpman = Block & {
  jumpingSpeed: number;
  climbingSpeed: number;
  walkingSpeed: number;
};

const PLAYER: Features = {
  code: "M",
  touch: false,
  theme: Song.Theme,
};
ROSTER[PLAYER.code] = PLAYER;

export const Jumpman: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.roster);
  const { gravity } = useSelector((state: RootState) => state.options);
  const goal = useSelector((state: RootState) => state.goal);

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

  useKeyboard({
    key: "W",
    onKeyDown: () =>
      dispatch(
        setJumpman({
          ...jumpman,
          x: goal.x,
          y: goal.y,
        })
      ),
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
      <Star />
    </div>
  );
};
