import { Position } from "./Position";
import { FPS } from "./Game";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { createBarrel, moveBarrel, destroyBarrel } from "./BarrelSlice";
import useInterval from "./Interval";

export type Barrel = Position & { id: number };

export type BarrelFactory = Position & {
  barrels: Barrel[];
};

const Barrel: React.FC<Barrel> = ({ id, x, y }) => {
  const dispatch: AppDispatch = useDispatch();

  const speed = -1 - Math.random();
  useInterval(() => {
    dispatch(moveBarrel({ id, x: speed, y: 0 }));
  }, FPS);

  return (
    <div
      className="Barrel Block"
      onClick={() => dispatch(destroyBarrel(id))}
      style={{
        left: x,
        bottom: y,
      }}
    ></div>
  );
};

export const BarrelFactory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const barrelFactory = useSelector((state: RootState) => state.barrelFactory);

  useInterval(() => {
    const barrel: Barrel = {
      id: Date.now(),
      x: barrelFactory.x,
      y: barrelFactory.y,
    };
    dispatch(createBarrel(barrel));
  }, 2000);

  return (
    <>
      <div
        className="BarrelFactory Block"
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
