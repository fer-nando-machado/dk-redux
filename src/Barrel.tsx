import { useState, useRef } from "react";
import { Position, usePositionState } from "./Position";
import { FPS } from "./Game";

type Barrel = {
  //id: number;
  //destroy: () => void;
};

export type BarrelProps = Position & Barrel;

const Barrel: React.FC<BarrelProps> = ({ x, y }) => {
  const [barrel, setBarrel] = usePositionState({ x, y });

  const isMoving = useRef<any>(null);
  const startsMoving = (speed: number) => {
    if (isMoving.current !== null) return;
    isMoving.current = setInterval(() => {
      setBarrel((old) => ({ ...old, x: old.x + speed }));
    }, FPS);
  };
  const stopsMoving = () => {
    clearInterval(isMoving.current);
    isMoving.current = null;
  };

  startsMoving(-1);

  return (
    <div
      className="Barrel Block"
      //  onClick={destroy}
      style={{
        left: barrel.x,
        bottom: barrel.y,
      }}
    ></div>
  );
};

export type BarrelFactoryProps = Position & {
  barrels: Position[];
};

export const BarrelFactory: React.FC<BarrelFactoryProps> = ({
  x,
  y,
  barrels,
}) => {
  /*
  useEffect(() => {
    const startInterval = () => {
      intervalIdRef.current = setInterval(() => {
        generateBarrel();
        // Randomize the interval to be between 1 and 3 seconds
        clearInterval(intervalIdRef.current!);
        startInterval();
      }, 1000 + Math.random() * 2000);
    };

    startInterval();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);
*/

  /*
  const [barrels, setBarrels] = useState<BarrelProps[]>([]);

  const isRolling = useRef<any>(null);
  const startRolling = () => {
    if (isRolling.current !== null) return;

    isRolling.current = setInterval(() => {
      generateBarrel();
    }, 2000);
  };

  const generateBarrel = () => {
    const id = Date.now();
    const newBarrel: BarrelProps = {
      id,
      x,
      y,
      //destroy: () => removeBarrelById(id),
    };

    setBarrels((b) => [...b, newBarrel]);
  };

  const removeBarrelById = (id: number) => {
    setBarrels((prevBarrels) =>
      prevBarrels.filter((barrel) => barrel.id !== id)
    );
  };
*/

  /*
  // Destroy the oldest barrel (FIFO)
  const destroyOldestBarrel = () => {
    setBarrels((prevBarrels) => {
      if (prevBarrels.length === 0) return prevBarrels; // No barrels to remove
      return prevBarrels.slice(1); // Remove the oldest barrel (first element)
    });
  };

  // Destroy the newest barrel (LIFO)
  const destroyNewestBarrel = () => {
    setBarrels((prevBarrels) => {
      if (prevBarrels.length === 0) return prevBarrels; // No barrels to remove
      return prevBarrels.slice(0, -1); // Remove the newest barrel (last element)
    });
  };
*/
  //startRolling();
  console.log(barrels);

  return (
    <>
      <div
        className="Factory Block"
        style={{
          left: x,
          bottom: y,
        }}
      />

      {barrels.map((b, index) => (
        <Barrel x={b.x} y={b.y} key={index} />
      ))}
    </>
  );
};
