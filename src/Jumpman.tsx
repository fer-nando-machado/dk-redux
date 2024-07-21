import { Position } from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { useRef } from "react";
import { FPS } from "./Game";
import { moveJumpman } from "./JumpmanSlice";
import useKeyboard from "./useKeyboard";
import useInterval from "./useInterval";

export type Jumpman = Position & {};

type Jump = {
  speed: number;
  height: number;
  remaining: number;
  down: boolean;
};

const Jumpman: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  // const paused = useSelector((state: RootState) => state.game.paused);

  const jumping = useRef<Jump | null>(null);
  useInterval(() => {
    if (!jumping.current) return;

    const { speed, height, down } = jumping.current;
    dispatch(moveJumpman({ x: 0, y: !down ? speed : -speed }));

    jumping.current.remaining -= speed;
    if (jumping.current.remaining > 0) return;

    stopJumping();
    if (!down) startJumping(speed, height, true);
  }, FPS);
  const startJumping = (speed: number, height: number, down: boolean) => {
    if (jumping.current) return;
    jumping.current = { speed, height, remaining: height, down };
  };
  const stopJumping = () => {
    jumping.current = null;
  };

  const walking = useRef<number | null>(null);
  useInterval(() => {
    if (!walking.current || climbing.current) return;
    dispatch(moveJumpman({ x: walking.current, y: 0 }));
  }, FPS);
  const startWalking = (speed: number) => {
    if (walking.current) return;
    walking.current = speed;
  };
  const stopWalking = () => {
    walking.current = null;
  };

  const climbing = useRef<number | null>(null);
  useInterval(() => {
    if (!climbing.current || walking.current || jumping.current) return;
    dispatch(moveJumpman({ x: 0, y: climbing.current }));
  }, FPS);
  const startClimbing = (speed: number) => {
    if (climbing.current) return;
    climbing.current = speed;
  };
  const stopClimbing = () => {
    climbing.current = null;
  };

  const gravity = 0;
  useInterval(() => {
    dispatch(moveJumpman({ x: 0, y: gravity }));
  }, FPS);

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
    onKeyDown: () => startJumping(+4, 72, false),
    onKeyUp: () => {},
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
