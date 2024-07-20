import { useRef, useState } from "react";
import "./Game.scss";
import { useKeyboard } from "./Keyboard";
import { Boundaries, usePositionState } from "./Position";
import Mario from "./Mario";
import { BarrelFactory, BarrelFactoryProps, BarrelProps } from "./Barrel";

export const FPS = 16.67;

const Game = () => {
  const [factory, setFactory] = useState<BarrelFactoryProps>({
    x: 475,
    y: 0,
    barrels: [],
  });
  const isRolling = useRef<any>(null);
  const startRolling = () => {
    if (isRolling.current !== null) return;

    isRolling.current = setInterval(() => {
      generateBarrel();
    }, 2000);
  };

  const generateBarrel = () => {
    const newBarrel: BarrelProps = {
      x: factory.x,
      y: factory.y,
    };

    setFactory((old) => ({
      ...old,
      barrels: [...old.barrels, newBarrel],
    }));
  };

  startRolling();

  const [mario, setMario] = usePositionState({ x: 0, y: 0 });

  const isJumping = useRef<any>(null);
  const startsJumping = (speed: number, height: number, down?: boolean) => {
    if (isJumping.current !== null) return;
    let remaining = height;
    isJumping.current = setInterval(() => {
      remaining = remaining - speed;
      setMario((old) => ({ ...old, y: old.y + (!down ? speed : -speed) }));
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
      setMario((old) => ({ ...old, x: old.x + speed }));
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
      setMario((old) => ({ ...old, y: old.y + speed }));
    }, FPS);
  };
  const stopsClimbing = () => {
    clearInterval(isClimbing.current);
    isClimbing.current = null;
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

  console.log(mario);
  return (
    <div
      className="Game"
      style={{ width: Boundaries.max.x, height: Boundaries.max.y }}
    >
      <Mario {...mario} />
      <BarrelFactory {...factory} />
    </div>
  );
};

export default Game;
