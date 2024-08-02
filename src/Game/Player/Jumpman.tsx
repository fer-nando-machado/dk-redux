import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { useIntervalFPS } from "../Hooks/useInterval";
import { setPlayer } from "../System/OptionsSlice";
import { Block } from "../Level/Block";
import { moveJumpman, moveJumpmanClimb } from "./JumpmanSlice";
import DeutschBox from "./DeutschBox";
import Dog from "./Hunt/Dog";
import "./Jumpman.scss";

export type Jumpman = Block & {};

type Jump = {
  speed: number;
  length: number;
  remaining: number;
};

const CODE = "M";
export const Jumpman: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { player, gravity, lowFPS } = useSelector(
    (state: RootState) => state.options
  );

  const jumping = useRef<Jump | null>(null);
  useIntervalFPS(() => {
    if (!jumping.current) return;
    dispatch(moveJumpman({ x: 0, y: jumping.current.speed }));
    jumping.current.remaining -= lowFPS ? 2 : 1;
    if (jumping.current.remaining > 0) return;
    stopJumping();
  });
  const startJumping = (speed: number, length: number) => {
    if (jumpman.isJumping) return;
    if (jumping.current) return;
    jumping.current = { speed, length, remaining: length };
  };
  const stopJumping = () => {
    if (!jumping.current) return;
    jumping.current = null;
  };

  const walking = useRef<number | null>(null);
  useIntervalFPS(() => {
    if (!walking.current || climbing.current) return;
    dispatch(moveJumpman({ x: walking.current, y: 0 }));
  });
  const startWalking = (speed: number) => {
    if (walking.current) return;
    walking.current = speed;
  };
  const stopWalking = () => {
    if (!walking.current) return;
    walking.current = null;
  };

  const climbing = useRef<number | null>(null);
  useIntervalFPS(() => {
    if (!climbing.current || walking.current || jumping.current) return;
    dispatch(moveJumpmanClimb({ x: 0, y: climbing.current }));
  });
  const startClimbing = (speed: number) => {
    if (climbing.current) return;
    climbing.current = speed;
  };
  const stopClimbing = () => {
    if (!climbing.current) return;
    climbing.current = null;
  };

  useIntervalFPS(() => {
    if (jumping.current || climbing.current) return;
    dispatch(
      moveJumpman({
        x: 0,
        y: gravity ? -3 : 0,
      })
    );
  });

  useKeyboard({
    key: "ArrowUp",
    onKeyDown: () => startClimbing(+1),
    onKeyUp: () => stopClimbing(),
  });
  useKeyboard({
    key: "ArrowDown",
    onKeyDown: () => startClimbing(-1),
    onKeyUp: () => stopClimbing(),
  });
  useKeyboard({
    key: "ArrowLeft",
    onKeyDown: () => startWalking(-2),
    onKeyUp: () => stopWalking(),
  });
  useKeyboard({
    key: "ArrowRight",
    onKeyDown: () => startWalking(+2),
    onKeyUp: () => stopWalking(),
  });
  useKeyboard({
    key: " ",
    onKeyDown: () => startJumping(3, 21),
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
      <DeutschBox />
      <Dog />
    </div>
  );
};
