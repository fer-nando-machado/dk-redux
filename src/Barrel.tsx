import { useEffect, useRef } from "react";
import { Position } from "./Position";
import { FPS } from "./Game";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { createBarrel, moveBarrel } from "./BarrelSlice";

export type Barrel = Position & { id?: number };

export type BarrelFactory = Position & {
  barrels: Barrel[];
};

const Barrel: React.FC<Barrel> = ({ id, x, y }) => {
  const dispatch: AppDispatch = useDispatch();

  const isMoving = useRef<any>(null);
  const startsMoving = (speed: number) => {
    if (isMoving.current !== null) return;
    isMoving.current = setInterval(() => {
      dispatch(moveBarrel({ id, x: speed, y: 0 }));
    }, FPS);
  };
  /*
  const stopsMoving = () => {
    clearInterval(isMoving.current);
    isMoving.current = null;
  };
*/
  startsMoving(-1);

  return (
    <div
      className="Barrel Block"
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
  const isRolling = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startRolling = () => {
      if (isRolling.current !== null) return;
      isRolling.current = setInterval(() => {
        const newBarrel: Barrel = {
          id: Math.random() * 1000,
          x: barrelFactory.x,
          y: barrelFactory.y,
        };
        dispatch(createBarrel(newBarrel));
      }, 2000);
    };

    startRolling();

    return () => {
      if (isRolling.current !== null) {
        clearInterval(isRolling.current);
        isRolling.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        className="BarrelFactory Block"
        style={{
          left: barrelFactory.x,
          bottom: barrelFactory.y,
        }}
      />

      {barrelFactory.barrels.map((b, index) => (
        <Barrel {...b} key={index} />
      ))}
    </>
  );
};
