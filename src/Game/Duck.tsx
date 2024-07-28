import { Block, getRandomDirection, isDirectionLeft } from "./Block";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import {
  createDuck,
  moveDuck,
  destroyDuck,
  moveDuckFactory,
} from "./DuckSlice";
import useInterval from "./useInterval";
import "./Duck.scss";
import { setPlayer } from "./System/OptionsSlice";
import { isDuckHunting } from "./Player/Dog";
import { getRandomX } from "./Position";
import Target from "./Target";

export type Duck = Block & { id: number };

export type DuckFactory = Block & {
  ducks: Duck[];
};

export const MAX_DUCKS = 2;

const Duck: React.FC<Duck> = (duck) => {
  const dispatch: StoreDispatch = useDispatch();

  const x = (isDirectionLeft(duck.direction) ? -1 : 1) * Math.random();
  const y = 4 + Math.random() * 3;

  useInterval(() => {
    dispatch(
      moveDuck({
        ...duck,
        x,
        y,
      })
    );
  });

  const onClickDuck = () => {
    dispatch(setPlayer("DH"));
    dispatch(destroyDuck(duck.id));
  };

  return (
    <div
      className={`Duck Block Round ${duck.direction}`}
      style={{
        left: duck.x,
        bottom: duck.y,
      }}
    >
      {"oo"}
      <Target
        points={{ value: 250, position: duck }}
        callback={onClickDuck}
        always
      />
    </div>
  );
};

export const DuckFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const duckFactory = useSelector((state: RootState) => state.duckFactory);

  const hasAim = isDuckHunting();
  const interval = hasAim ? 2500 : 7000;

  useInterval(() => {
    const direction = getRandomDirection();
    const duck: Duck = {
      ...duckFactory,
      id: Date.now(),
      direction,
    };
    dispatch(createDuck(duck));

    const x = getRandomX();
    dispatch(moveDuckFactory(x));
  }, interval);

  return (
    <>
      <div
        className={`DuckFactory Block Factory`}
        style={{
          left: duckFactory.x,
          bottom: duckFactory.y,
        }}
      />
      {duckFactory.ducks.map((b) => (
        <Duck {...b} key={b.id} />
      ))}
      {hasAim && (
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
