import { Block } from "./Block";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import { createBarrel, moveBarrel, destroyBarrel } from "./BarrelSlice";
import useInterval from "./useInterval";
import "./Barrel.scss";

export type Barrel = Block & { id: number };

export type BarrelFactory = Block & {
  barrels: Barrel[];
};

export const MAX_BARRELS = 4;

const Barrel: React.FC<Barrel> = (barrel) => {
  const dispatch: StoreDispatch = useDispatch();

  const gravity = useSelector((state: RootState) => state.options.gravity);
  const speed = barrel.direction === "left" ? -1.25 : 1.25;

  useInterval(() => {
    dispatch(
      moveBarrel({
        ...barrel,
        x: speed,
        y: gravity ? -5 : 0,
      })
    );
  });

  return (
    <div
      className="Barrel Block Round"
      onClick={() => dispatch(destroyBarrel(barrel.id))}
      style={{
        left: barrel.x,
        bottom: barrel.y,
      }}
    />
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
        className="BarrelFactory Block Round"
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
