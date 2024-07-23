import { Position } from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import { createBarrel, moveBarrel, destroyBarrel } from "./BarrelSlice";
import useInterval from "./useInterval";
import "./Barrel.scss";

export type Barrel = Position & { id: number };

export type BarrelFactory = Position & {
  barrels: Barrel[];
};

export const MAX_BARRELS = 5;

const Barrel: React.FC<Barrel> = ({ id, x, y }) => {
  const dispatch: StoreDispatch = useDispatch();

  const gravity = useSelector((state: RootState) => state.options.gravity);
  const speed = -1 - Math.random();

  useInterval(() => {
    dispatch(moveBarrel({ id, x: speed, y: gravity ? -5 : 0 }));
  });

  return (
    <div
      className="Barrel Block Round"
      onClick={() => dispatch(destroyBarrel(id))}
      style={{
        left: x,
        bottom: y,
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
      x: barrelFactory.x,
      y: barrelFactory.y,
    };
    dispatch(createBarrel(barrel));
  }, 1500);

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
