import { Position } from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { useEffect, useRef } from "react";
import { FPS } from "./Game";
import { moveJumpman } from "./JumpmanSlice";
import useKeyboard from "./useKeyboard";
import useInterval from "./useInterval";

export type Jumpman = Position & {};

const Jumpman: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);

  const jumping = useRef<NodeJS.Timeout | null>(null);
  const walking = useRef<NodeJS.Timeout | null>(null);
  const climbing = useRef<NodeJS.Timeout | null>(null);

  const startJumping = (speed: number, height: number, down?: boolean) => {
    if (jumping.current !== null) return;

    let remaining = height;
    jumping.current = setInterval(() => {
      remaining = remaining - speed;
      dispatch(moveJumpman({ x: 0, y: !down ? speed : -speed / 2 }));
      if (remaining <= 0) {
        stopJumping();
        if (!down) startJumping(speed, height, true);
      }
    }, FPS);
  };

  const stopJumping = () => {
    if (jumping.current) {
      clearInterval(jumping.current);
      jumping.current = null;
    }
  };

  const startWalking = (speed: number) => {
    if (walking.current !== null || climbing.current !== null) return;

    walking.current = setInterval(() => {
      dispatch(moveJumpman({ x: speed, y: 0 }));
    }, FPS);
  };
  const stopWalking = () => {
    if (walking.current) {
      clearInterval(walking.current);
      walking.current = null;
    }
  };

  const startClimbing = (speed: number) => {
    if (
      jumping.current !== null ||
      walking.current !== null ||
      climbing.current !== null
    )
      return;

    climbing.current = setInterval(() => {
      dispatch(moveJumpman({ x: 0, y: speed }));
    }, FPS);
  };

  const stopClimbing = () => {
    if (climbing.current) {
      clearInterval(climbing.current);
      climbing.current = null;
    }
  };

  const gravity = -0.25;
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
    onKeyDown: () => startJumping(+4, 72),
    onKeyUp: () => {},
  });

  useEffect(() => {
    return () => {
      stopJumping();
      stopWalking();
      stopClimbing();
    };
  }, []);

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
