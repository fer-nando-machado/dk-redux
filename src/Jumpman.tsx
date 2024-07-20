import { Position } from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { useRef } from "react";
import { FPS } from "./Game";
import { useKeyboard } from "./Keyboard";
import { moveJumpman } from "./JumpmanSlice";

export type Jumpman = Position & {};

const Jumpman: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);

  const isJumping = useRef<any>(null);
  const startsJumping = (speed: number, height: number, down?: boolean) => {
    if (isJumping.current !== null) return;
    let remaining = height;
    isJumping.current = setInterval(() => {
      remaining = remaining - speed;
      dispatch(moveJumpman({ x: 0, y: !down ? speed : -speed }));
      if (remaining <= 0) {
        stopsJumping();
        !down && startsJumping(speed, height, true);
      }
    }, FPS);
  };
  const stopsJumping = () => {
    clearInterval(isJumping.current);
    isJumping.current = null;
  };

  const isWalking = useRef<any>(null);
  const startsWalking = (speed: number) => {
    if (isWalking.current !== null) return;
    if (isClimbing.current !== null) return;
    isWalking.current = setInterval(() => {
      dispatch(moveJumpman({ x: speed, y: 0 }));
    }, FPS);
  };
  const stopsWalking = () => {
    clearInterval(isWalking.current);
    isWalking.current = null;
  };

  const isClimbing = useRef<any>(null);
  const startsClimbing = (speed: number) => {
    if (isJumping.current !== null) return;
    if (isWalking.current !== null) return;
    if (isClimbing.current !== null) return;
    isClimbing.current = setInterval(() => {
      dispatch(moveJumpman({ x: 0, y: speed }));
    }, FPS);
  };
  const stopsClimbing = () => {
    clearInterval(isClimbing.current);
    isClimbing.current = null;
  };

  const isGravity = useRef<any>(null);
  const startsGravity = (speed: number) => {
    if (isGravity.current !== null) return;
    isGravity.current = setInterval(() => {
      dispatch(moveJumpman({ x: 0, y: speed }));
    }, FPS);
  };

  useKeyboard({
    key: "ArrowUp",
    onKeyDown: () => startsClimbing(+1),
    onKeyUp: () => stopsClimbing(),
  });
  useKeyboard({
    key: "ArrowDown",
    onKeyDown: () => startsClimbing(-1),
    onKeyUp: () => stopsClimbing(),
  });
  useKeyboard({
    key: "ArrowLeft",
    onKeyDown: () => startsWalking(-2),
    onKeyUp: () => stopsWalking(),
  });
  useKeyboard({
    key: "ArrowRight",
    onKeyDown: () => startsWalking(+2),
    onKeyUp: () => stopsWalking(),
  });
  useKeyboard({
    key: " ",
    onKeyDown: () => startsJumping(+4, 72),
    onKeyUp: () => {},
  });
  startsGravity(-0.25);

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
