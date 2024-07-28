import { Block } from "./Block";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import { useRef } from "react";
import { setPlayer } from "./System/OptionsSlice";
import { moveJumpman } from "./JumpmanSlice";
import useKeyboard from "./Hooks/useKeyboard";
import useInterval from "./Hooks/useInterval";
import DeutschBox from "./Player/DeutschBox";
import Dog from "./Player/Hunt/Dog";
import "./Jumpman.scss";

export type Jumpman = Block & {};

type Jump = {
  speed: number;
  height: number;
  remaining: number;
};

const CODE = "M";
export const Jumpman: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { player, gravity } = useSelector((state: RootState) => state.options);

  const jumping = useRef<Jump | null>(null);
  useInterval(() => {
    if (!jumping.current) return;
    dispatch(moveJumpman({ ...jumpman, x: 0, y: jumping.current.speed }));
    jumping.current.remaining -= jumping.current.speed;
    if (jumping.current.remaining > 0) return;
    stopJumping();
  });
  const startJumping = (speed: number, height: number) => {
    if (jumpman.isJumping) return;
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
    dispatch(moveJumpman({ ...jumpman, x: walking.current, y: 0 }));
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
    dispatch(moveJumpman({ ...jumpman, x: 0, y: climbing.current }));
  });
  const startClimbing = (speed: number) => {
    if (climbing.current) return;
    climbing.current = speed;
  };
  const stopClimbing = () => {
    if (!climbing.current) return;
    climbing.current = null;
  };

  useInterval(() => {
    dispatch(
      moveJumpman({
        ...jumpman,
        x: 0,
        y: gravity && jumpman.isJumping ? -4 : 0,
      })
    );
  });

  useKeyboard({
    key: "ArrowUp",
    onKeyDown: () => startClimbing(+2),
    onKeyUp: () => stopClimbing(),
  });
  useKeyboard({
    key: "ArrowDown",
    onKeyDown: () => startClimbing(-2),
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
    onKeyDown: () => startJumping(+10, 150),
    onKeyUp: () => stopJumping(),
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
