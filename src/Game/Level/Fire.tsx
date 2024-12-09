import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import { useIntervalFPS } from "../Hooks/useInterval";
import { moveFire } from "./FireSlice";
import { Block } from "./Block";
import "./Fire.scss";

export type Fire = Block & {
  id: number;
};

export type FireFactory = Block & {
  fires: Fire[];
};

const Fire: React.FC<Fire> = (fire) => {
  const dispatch: StoreDispatch = useDispatch();

  useIntervalFPS(() => {
    dispatch(moveFire(fire.id));
  });

  return (
    <div
      className={`Fire Jumpman Block ${fire.direction}`}
      style={{ left: fire.x, bottom: fire.y }}
    />
  );
};

export const FireFactory: React.FC = () => {
  const fireFactory = useSelector((state: RootState) => state.fireFactory);
  const isOnFire = fireFactory.fires.length > 0;

  return (
    <>
      {fireFactory.fires.map((b) => (
        <Fire {...b} key={b.id} />
      ))}
      {isOnFire && (
        <div
          className={`Fire Block`}
          style={{
            left: fireFactory.x,
            bottom: fireFactory.y,
          }}
        />
      )}
      <div
        className={`Fire Factory Block ${fireFactory.direction}`}
        style={{
          left: fireFactory.x,
          bottom: fireFactory.y,
        }}
      />
      <div
        className={`Drum Block ${fireFactory.direction}`}
        style={{
          left: fireFactory.x,
          bottom: fireFactory.y - 25 / 2,
        }}
      />
    </>
  );
};
