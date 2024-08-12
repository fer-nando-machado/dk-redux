import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import { Block } from "./Block";
import { moveBarrel, destroyBarrel, createBarrel } from "./BarrelSlice";
import { useIntervalFPS, useIntervalTimed } from "../Hooks/useInterval";
import Target from "../Player/Hunt/Target";
import "./Barrel.scss";

export type Barrel = Block & {
  id: number;
  ladders: number[];
  fallingSpeed: number;
};

export type BarrelFactory = Block & {
  barrels: Barrel[];
};

export const MAX_BARRELS = 5;

const Barrel: React.FC<Barrel> = (barrel) => {
  const dispatch: StoreDispatch = useDispatch();

  useIntervalFPS(() => {
    dispatch(moveBarrel(barrel.id));
  });

  const onClickBarrel = () => {
    dispatch(destroyBarrel(barrel.id));
  };

  return (
    <div
      className={`Barrel Block Round ${barrel.direction} ${
        barrel.fallingSpeed !== 0 ? "Falling" : ""
      }`}
      style={{ left: barrel.x, bottom: barrel.y }}
    >
      <Target
        points={{ value: 100, position: barrel }}
        callback={onClickBarrel}
      />
    </div>
  );
};

export const BarrelFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const barrelFactory = useSelector((state: RootState) => state.barrelFactory);

  useIntervalTimed(() => {
    dispatch(createBarrel());
  }, 5000);

  return (
    <>
      <div
        className={`Barrel Factory Block Round ${barrelFactory.direction}`}
        style={{
          left: barrelFactory.x,
          bottom: barrelFactory.y,
        }}
      />
      {barrelFactory.barrels.map((b) => (
        <Barrel {...b} key={b.id} />
      ))}
    </>
  );
};
