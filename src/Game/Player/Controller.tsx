import { useEffect, useState } from "react";
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

const Controller: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();

  const { onAir, climbingSpeed, jumpingSpeed, walkingSpeed } = useSelector(
    (state: RootState) => state.jumpman
  );
  const { lowFPS } = useSelector((state: RootState) => state.options);

  const [remaining, setRemaining] = useState(0);

  useIntervalFPS(() => {
    if (!jumpingSpeed) return;
    dispatch(moveJumpman({ x: 0, y: jumpingSpeed }));
    setRemaining(remaining - (lowFPS ? 2 : 1));
    if (remaining > 0) return;
    dispatch(setJumping(0));
  });
  const startJumping = (speed: number, length: number) => {
    if (onAir || jumpingSpeed) return;
    dispatch(setJumping(speed));
    setRemaining(length);
  };

  useIntervalFPS(() => {
    if (!walkingSpeed || climbingSpeed) return;
    dispatch(moveJumpman({ x: walkingSpeed, y: 0 }));
  });
  const startWalking = (speed: number) => {
    if (walkingSpeed === speed) return;
    dispatch(setWalking(speed));
  };
  const stopWalking = (speed: number) => {
    if (walkingSpeed !== speed) return;
    dispatch(setWalking(0));
  };

  useIntervalFPS(() => {
    if (!climbingSpeed || walkingSpeed || jumpingSpeed) return;
    dispatch(moveJumpmanClimb({ x: 0, y: climbingSpeed }));
  });
  const startClimbing = (speed: number) => {
    if (climbingSpeed === speed) return;
    dispatch(setClimbing(speed));
  };
  const stopClimbing = (speed: number) => {
    if (climbingSpeed !== speed) return;
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
    onKeyDown: () => startWalking(-1),
    onKeyUp: () => stopWalking(-1),
  });
  useKeyboard({
    key: "ArrowRight",
    onKeyDown: () => startWalking(+1),
    onKeyUp: () => stopWalking(+1),
  });
  useKeyboard({
    key: " ",
    onKeyDown: () => startJumping(2, 28),
  });

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("controller:inserted"));
    return () => {
      window.dispatchEvent(new CustomEvent("controller:removed"));
    };
  }, []);

  return null;
};

export default Controller;
