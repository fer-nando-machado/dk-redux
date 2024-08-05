import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useIntervalFPS } from "../Hooks/useInterval";
import useKeyboard from "../Hooks/useKeyboard";
import {
  moveJumpman,
  moveJumpmanClimb,
  setClimbing,
  setJumping,
  setWalking,
} from "./JumpmanSlice";

const Joystick: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();

  const {
    onAir,
    climbingSpeed: isClimbing,
    jumpingSpeed: isJumping,
    walkingSpeed: isWalking,
  } = useSelector((state: RootState) => state.jumpman);
  const { lowFPS } = useSelector((state: RootState) => state.options);

  const [remaining, setRemaining] = useState(0);

  useIntervalFPS(() => {
    if (!isJumping) return;
    dispatch(moveJumpman({ x: 0, y: isJumping }));
    setRemaining(remaining - (lowFPS ? 2 : 1));
    if (remaining > 0) return;
    dispatch(setJumping(0));
  });
  const startJumping = (speed: number, length: number) => {
    if (onAir || isJumping) return;
    dispatch(setJumping(speed));
    setRemaining(length);
  };

  useIntervalFPS(() => {
    if (!isWalking || isClimbing) return;
    dispatch(moveJumpman({ x: isWalking, y: 0 }));
  });
  const startWalking = (speed: number) => {
    if (isWalking === speed) return;
    dispatch(setWalking(speed));
  };
  const stopWalking = (speed: number) => {
    if (isWalking !== speed) return;
    dispatch(setWalking(0));
  };

  useIntervalFPS(() => {
    if (!isClimbing || isWalking || isJumping) return;
    dispatch(moveJumpmanClimb({ x: 0, y: isClimbing }));
  });
  const startClimbing = (speed: number) => {
    if (isClimbing === speed) return;
    dispatch(setClimbing(speed));
  };
  const stopClimbing = (speed: number) => {
    if (isClimbing !== speed) return;
    dispatch(setClimbing(0));
  };

  useKeyboard({
    key: "ArrowUp",
    onKeyDown: () => startClimbing(+1),
    onKeyUp: () => stopClimbing(+1),
  });
  useKeyboard({
    key: "ArrowDown",
    onKeyDown: () => startClimbing(-1),
    onKeyUp: () => stopClimbing(-1),
  });
  useKeyboard({
    key: "ArrowLeft",
    onKeyDown: () => startWalking(-2),
    onKeyUp: () => stopWalking(-2),
  });
  useKeyboard({
    key: "ArrowRight",
    onKeyDown: () => startWalking(+2),
    onKeyUp: () => stopWalking(+2),
  });
  useKeyboard({
    key: " ",
    onKeyDown: () => startJumping(3, 18),
  });

  return <div className="Joystick" />;
};

export default Joystick;
