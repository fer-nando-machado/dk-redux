import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../../reduxStore";
import { Block, isDirectionLeft, getRandomDirection } from "../../Level/Block";
import { getRandomX } from "../../Level/Position";
import { setPlayer } from "../../System/OptionsSlice";
import useInterval from "../../Hooks/useInterval";
import { createDuck, moveDuck, destroyDuck, setDuckFactory } from "./DuckSlice";
import { isDuckHunting } from "./Dog";
import Target from "./Target";
import "./Duck.scss";

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

  const isHunting = isDuckHunting();
  const interval = isHunting ? 2500 : 7000;

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
