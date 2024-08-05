import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { Block } from "../Level/Block";
import DeutschBox from "./DeutschBox";
import Dog from "./Hunt/Dog";
import Joystick from "./Joystick";
import { useIntervalFPS } from "../Hooks/useInterval";
import { moveJumpman } from "./JumpmanSlice";
import useKeyboard from "../Hooks/useKeyboard";
import { setPlayer } from "../System/OptionsSlice";
import "./Jumpman.scss";

export type Jumpman = Block & {
  jumpingSpeed: number;
  climbingSpeed: number;
  walkingSpeed: number;
};

const CODE = "M";
export const Jumpman: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();

  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { player, gravity } = useSelector((state: RootState) => state.options);

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
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return (
    <div
      className={`Player Jumpman Block ${player.code} ${jumpman.direction}`}
      style={{
        left: jumpman.x,
        bottom: jumpman.y,
      }}
    >
      {player.code == CODE && <Joystick />}
      {/** TODO generalize as option to all chars with joysticks */}
      <DeutschBox />
      <Dog />
    </div>
  );
};
