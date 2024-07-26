import { Block, isDirectionLeft } from "./Block";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import { createBarrel, moveBarrel, destroyBarrel } from "./BarrelSlice";
import useInterval from "./useInterval";
import "./Barrel.scss";
import { isDuckHunting } from "./Player/Dog";

export type Barrel = Block & { id: number };

export type BarrelFactory = Block & {
  barrels: Barrel[];
};

export const MAX_BARRELS = 4;

const Barrel: React.FC<Barrel> = (barrel) => {
  const dispatch: StoreDispatch = useDispatch();

  const { gravity } = useSelector((state: RootState) => state.options);
  const gravitySpeed = gravity ? -7 : 0;
  const speed = isDirectionLeft(barrel.direction) ? -1.25 : 1.25;

  useInterval(() => {
    dispatch(
      moveBarrel({
        ...barrel,
        x: speed,
        y: gravitySpeed,
      })
    );
  });

  const hasAim = isDuckHunting();
  const onClick = () => {
    if (!hasAim) return;
    dispatch(destroyBarrel(barrel.id));
  };

  return (
    <div
      className={`Barrel Block Round ${barrel.direction}`}
      onClick={() => onClick()}
      style={{
        left: barrel.x,
        bottom: barrel.y,
      }}
    >
      <div className={`Target ${hasAim ? "Aim" : ""}`}></div>
    </div>
  );
};

export const BarrelFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const barrelFactory = useSelector((state: RootState) => state.barrelFactory);

  useInterval(() => {
    const barrel: Barrel = {
      id: Date.now(),
      ...barrelFactory,
    };
    dispatch(createBarrel(barrel));
  }, 2500);

  return (
    <>
      <div
        className={`BarrelFactory Block Factory Round ${barrelFactory.direction}`}
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
