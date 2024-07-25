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
import { setPlayer } from "./OptionsSlice";
import { isDuckHunting } from "./Player/Dog";

export type Duck = Block & { id: number };

export type DuckFactory = Block & {
  ducks: Duck[];
};

export const MAX_DUCKS = 2;

const Duck: React.FC<Duck> = (duck) => {
  const dispatch: StoreDispatch = useDispatch();

  const x = (isDirectionLeft(duck.direction) ? -1 : 1) * Math.random();
  const y = 4 + Math.random() * 3;
  //console.log(x, y);

  useInterval(() => {
    dispatch(
      moveDuck({
        ...duck,
        x,
        y,
      })
    );
  });

  const onClick = () => {
    dispatch(setPlayer("DH"));
    dispatch(destroyDuck(duck.id));
  };

  const hasAim = isDuckHunting();
  return (
    <div
      className={`Duck Block Round ${duck.direction}`}
      onClick={() => onClick()}
      style={{
        left: duck.x,
        bottom: duck.y,
      }}
    >
      <div className={`Target ${hasAim ? "Aim" : ""}`}></div>
    </div>
  );
};

export const DuckFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const duckFactory = useSelector((state: RootState) => state.duckFactory);

  useInterval(() => {
    const direction = getRandomDirection();
    const duck: Duck = {
      ...duckFactory,
      id: Date.now(),
      direction,
    };
    dispatch(createDuck(duck));

    const update = isDirectionLeft(direction) ? -100 : 100;
    dispatch(moveDuckFactory(update * Math.random()));
  }, 5000);

  return (
    <>
      <div
        className={`DuckFactory Block`}
        style={{
          left: duckFactory.x,
          bottom: duckFactory.y,
        }}
      />
      {duckFactory.ducks.map((b) => (
        <Duck {...b} key={b.id} />
      ))}
    </>
  );
};
