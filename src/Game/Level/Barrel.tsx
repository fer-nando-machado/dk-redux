import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import { useIntervalFPS, useIntervalTimed } from "../Hooks/useInterval";
import { getCompleteCount } from "../System/Roster";
import Target from "../Player/Hunt/Target";
import { Block } from "./Block";
import { moveBarrel, destroyBarrel, createBarrel } from "./BarrelSlice";
import "./Barrel.scss";

export type Barrel = Block & {
  id: number;
  ladders: number[];
  fallingSpeed: number;
};

export type BarrelFactory = Block & {
  barrels: Barrel[];
  height: number;
  width: number;
};

const Barrel: React.FC<Barrel> = (barrel) => {
  const dispatch: StoreDispatch = useDispatch();
  const isFalling = barrel.fallingSpeed !== 0;

  useIntervalFPS(() => {
    dispatch(moveBarrel(barrel.id));
  });

  const onClickBarrel = () => {
    dispatch(destroyBarrel(barrel.id));
  };

  return (
    <div
      className={`Barrel Block Round ${isFalling ? "Falling" : ""} ${
        barrel.direction
      }`}
      style={{ left: barrel.x, bottom: barrel.y }}
    >
      {!isFalling && (
        <Target
          points={{ value: 100, position: barrel }}
          callback={onClickBarrel}
        />
      )}
    </div>
  );
};

export const BarrelFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const barrelFactory = useSelector((state: RootState) => state.barrelFactory);
  const { players } = useSelector((state: RootState) => state.roster);
  const completed = getCompleteCount(players);
  const rolled = barrelFactory.height - 25;

  const shift = useMemo(() => {
    const shiftUnits = barrelFactory.height / 4;
    const shift = completed * shiftUnits;
    if (shift > rolled) {
      return rolled;
    }
    return shift;
  }, [completed, barrelFactory.height]);

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
      <div
        className={`Curtain Block ${shift === rolled ? "Rolled" : ""}`}
        style={{
          left: barrelFactory.x + (25 - barrelFactory.width) / 2,
          bottom: barrelFactory.y + shift + (25 - barrelFactory.height) / 2,
          width: barrelFactory.width,
          height: barrelFactory.height - shift,
        }}
      />
    </>
  );
};
