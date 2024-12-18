import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../../reduxStore";
import { useIntervalTimed, useIntervalFPS } from "../../Hooks/useInterval";
import { Block, isDirectionLeft, getRandomDirection } from "../../Level/Block";
import { getRandomX } from "../../Level/Position";
import { setTarget, unsetTarget } from "../../Level/LadderSlice";
import { setPlayer } from "../../System/RosterSlice";
import { createDuck, moveDuck, destroyDuck, setDuckFactory } from "./DuckSlice";
import { isDuckHunting, hasUnlockedDuckHunting } from "./Dog";
import MusicHowler from "../../Hooks/useMusicHowler";
import Target from "./Target";
import "./Duck.scss";

export type Duck = Block & { id: number };

export type DuckFactory = Block & {
  ducks: Duck[];
};

export const MAX_DUCKS = 3;

const Duck: React.FC<Duck> = (duck) => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { ladders } = useSelector((state: RootState) => state.ladderFactory);

  const isUnlocked = hasUnlockedDuckHunting();

  const [state, setState] = useState(0);
  const isDead = state === 1 ? "Dead" : "";

  const { x, y } = useMemo(() => {
    let x = (isDirectionLeft(duck.direction) ? -1 : 1) * 5;
    let y = 4 + Math.floor(Math.random() * 3);
    if (isDead) {
      x = 0;
      y = -10;
    }
    return { x, y };
  }, [isDead, duck.direction]);

  useIntervalFPS(() => {
    if (isDead) {
      const target = ladders.find((l) => l.target);
      const speed = !target ? 0 : duck.x > target.x ? -10 : 10;
      dispatch(
        moveDuck({
          ...duck,
          x: speed,
          y,
        })
      );
    } else {
      dispatch(
        moveDuck({
          ...duck,
          x,
          y,
        })
      );
    }
  });

  useIntervalTimed(
    () => {
      dispatch(destroyDuck(duck.id));
    },
    isDead ? 2000 : 0
  );

  const onClickDuck = () => {
    if (!isUnlocked) {
      dispatch(setPlayer("DH"));
    }
    MusicHowler.play("fall");
    dispatch(unsetTarget());
    dispatch(setTarget({ x: duck.x, y: jumpman.y }));
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
      {isDead ? "xx" : "oo"}
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
  const interval = isHunting ? 3000 : !isUnlocked ? 7777 : 0;
  const color = isDirectionLeft(duckFactory.direction) ? "Purple" : "Green";

  useIntervalTimed(() => {
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
    MusicHowler.play("flap");
  }, interval);

  const handleShot = () => {
    MusicHowler.play("shot");
  };

  useEffect(() => {
    if (!isHunting) return;
    document.addEventListener("click", handleShot);
    return () => {
      document.removeEventListener("click", handleShot);
    };
  }, [isHunting]);

  return interval === 0 ? null : (
    <>
      <div
        className={`Duck Factory Block Round ${duckFactory.direction} ${color}`}
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
