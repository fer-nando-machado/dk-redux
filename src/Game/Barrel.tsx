import { Position, GRAVITY } from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./Store";
import { createBarrel, moveBarrel, destroyBarrel } from "./BarrelSlice";
import useInterval from "./useInterval";
import "./Barrel.scss";

export type Barrel = Position & { id: number };

export type BarrelFactory = Position & {
  barrels: Barrel[];
};

const Barrel: React.FC<Barrel> = ({ id, x, y }) => {
  const dispatch: Dispatch = useDispatch();

  const speed = -1 - Math.random();
  useInterval(() => {
    dispatch(moveBarrel({ id, x: speed, y: GRAVITY }));
  });

  return (
    <div
      className="Barrel Block Round"
      onClick={() => dispatch(destroyBarrel(id))}
      style={{
        left: x,
        bottom: y,
      }}
    ></div>
  );
};

export const BarrelFactory: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const barrelFactory = useSelector((state: RootState) => state.barrelFactory);

  useInterval(() => {
    const barrel: Barrel = {
      id: Date.now(),
      x: barrelFactory.x,
      y: barrelFactory.y,
    };
    dispatch(createBarrel(barrel));
  }, 3000);

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
