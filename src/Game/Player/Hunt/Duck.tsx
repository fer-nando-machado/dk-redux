import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../../reduxStore";
import { Block, isDirectionLeft, getRandomDirection } from "../../Level/Block";
import { getRandomX } from "../../Level/Position";
import { setPlayer } from "../../System/OptionsSlice";
import useInterval from "../../Hooks/useInterval";
import { createDuck, moveDuck, destroyDuck, setDuckFactory } from "./DuckSlice";
import { isDuckHunting, hasUnlockedDuckHunting } from "./Dog";
import Target from "./Target";
import { moveJumpman } from "../JumpmanSlice";
import "./Duck.scss";

export type Duck = Block & { id: number };

export type DuckFactory = Block & {
  ducks: Duck[];
};

export const MAX_DUCKS = 3;

const Duck: React.FC<Duck> = (duck) => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);

  const [state, setState] = useState(0);
  const isDead = state === 1 ? "Dead" : "";

  let x = (isDirectionLeft(duck.direction) ? -1 : 1) * 3;
  let y = 4;
  if (isDead) {
    x = 0;
    y = -10;
  }

  useInterval(() => {
    dispatch(
      moveDuck({
        ...duck,
        x,
        y,
      })
    );
  });

  useInterval(
    () => {
      dispatch(destroyDuck(duck.id));
    },
    isDead ? 2000 : 0
  );

  const onClickDuck = () => {
    const chaseSpeed = duck.x === jumpman.x ? 0 : duck.x < jumpman.x ? -1 : 1;
    dispatch(moveJumpman({ x: chaseSpeed, y: 7 }));
    dispatch(setPlayer("DH"));
    setState(1);
  };

  const color = useMemo(() => {
    return isDirectionLeft(duck.direction) ? "Purple" : "Green";
  }, []);

  return (
    <div
      className={`Duck Block Round ${duck.direction} ${color} ${isDead}`}
      style={{
        left: duck.x,
        bottom: duck.y,
      }}
    >
      {"oo"}
      {!isDead && (
        <Target
          points={{ value: 25, position: duck }}
          callback={onClickDuck}
          always
        />
      )}
    </div>
  );
};

export const DuckFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const duckFactory = useSelector((state: RootState) => state.duckFactory);

  const isUnlocked = hasUnlockedDuckHunting();
  const isHunting = isDuckHunting();
  const interval = isHunting ? 2000 : !isUnlocked ? 7777 : 0;

  useInterval(() => {
    dispatch(
      setDuckFactory({
        ...duckFactory,
        x: getRandomX(),
        direction: getRandomDirection(),
      })
    );
    dispatch(
      createDuck({
        ...duckFactory,
        id: Date.now(),
      })
    );
  }, interval);

  if (interval === 0) return <></>;
  return (
    <>
      <div
        className={`Duck Factory Block Round ${duckFactory.direction}`}
        style={{
          left: duckFactory.x,
          bottom: duckFactory.y,
        }}
      >
        {"oo"}
      </div>
      {duckFactory.ducks.map((b) => (
        <Duck {...b} key={b.id} />
      ))}
      {isHunting && (
        <div
          className={"Grass"}
          style={{
            bottom: duckFactory.y + 25,
          }}
        />
      )}
    </>
  );
};
