import { useEffect, useRef } from "react";
import { Position } from "./Position";
import { FPS } from "./Game";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { createBarrel, moveBarrel, destroyBarrel } from "./BarrelSlice";

export type Barrel = Position & { id?: number };

export type BarrelFactory = Position & {
  barrels: Barrel[];
};

const Barrel: React.FC<Barrel> = ({ id, x, y }) => {
  const dispatch: AppDispatch = useDispatch();
  const rolling = useRef<NodeJS.Timeout | null>(null);

  const startRolling = (speed: number) => {
    if (rolling.current !== null) return;
    rolling.current = setInterval(() => {
      dispatch(moveBarrel({ id, x: speed, y: 0 }));
    }, FPS);
  };

  const stopRolling = () => {
    if (rolling.current) {
      clearInterval(rolling.current);
      rolling.current = null;
    }
  };

  useEffect(() => {
    startRolling(-1 - Math.random());
    return () => {
      stopRolling();
    };
  }, []);

  return (
    <div
      className="Barrel Block"
      onClick={() => dispatch(destroyBarrel(id || 0))}
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
  const rolling = useRef<NodeJS.Timeout | null>(null);

  const startRolling = () => {
    if (rolling.current !== null) return;

    rolling.current = setInterval(() => {
      const barrel: Barrel = {
        id: Date.now(),
        x: barrelFactory.x,
        y: barrelFactory.y,
      };
      dispatch(createBarrel(barrel));
    }, 2000);
  };

  const stopRolling = () => {
    if (rolling.current) {
      clearInterval(rolling.current);
      rolling.current = null;
    }
  };

  useEffect(() => {
    startRolling();
    return () => {
      stopRolling();
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

      {barrelFactory.barrels.map((b) => (
        <Barrel {...b} key={b.id} />
      ))}
    </>
  );
};
