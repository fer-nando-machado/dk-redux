import { Position } from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./Store";
import { useRef } from "react";
import { moveJumpman } from "./JumpmanSlice";
import useKeyboard from "./useKeyboard";
import useInterval from "./useInterval";
import "./Jumpman.scss";

export type Jumpman = Position & {};

type Jump = {
  speed: number;
  height: number;
  remaining: number;
};

const Jumpman: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);

  const jumping = useRef<Jump | null>(null);
  useInterval(() => {
    if (!jumping.current) return;
    dispatch(moveJumpman({ x: 0, y: jumping.current.speed }));
    jumping.current.remaining -= jumping.current.speed;
    if (jumping.current.remaining > 0) return;
    stopJumping();
  });
  const startJumping = (speed: number, height: number) => {
    if (jumping.current) return;
    jumping.current = { speed, height, remaining: height };
  };
  const stopJumping = () => {
    if (!jumping.current) return;
    jumping.current = null;
  };

  const walking = useRef<number | null>(null);
  useInterval(() => {
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
  useInterval(() => {
    if (!climbing.current || walking.current || jumping.current) return;
    dispatch(moveJumpman({ x: 0, y: climbing.current }));
  });
  const startClimbing = (speed: number) => {
    if (climbing.current) return;
    climbing.current = speed;
  };
  const stopClimbing = () => {
    if (!climbing.current) return;
    climbing.current = null;
  };

  const gravity = -3;
  useInterval(() => {
    dispatch(moveJumpman({ x: 0, y: gravity }));
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
    onKeyDown: () => startJumping(+7, 77),
    onKeyUp: () => stopJumping(),
  });

  return (
    <div
      className="Jumpman Block"
      style={{
        left: jumpman.x,
        bottom: jumpman.y,
      }}
    />
  );
};

export default Jumpman;
