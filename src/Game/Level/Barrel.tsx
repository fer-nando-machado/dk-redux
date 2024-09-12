import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import { useIntervalFPS, useIntervalTimed } from "../Hooks/useInterval";
import { getCompleteCount } from "../System/Roster";
import Target from "../Player/Hunt/Target";
import { isStar } from "../Player/Star";
import { Block } from "./Block";
import { Position } from "./Position";
import { moveBarrel, destroyBarrel, createBarrel } from "./BarrelSlice";
import "./Barrel.scss";

export type Barrel = Block & {
  id: number;
  ladders: number[];
  fallingSpeed: number;
  path: Position[];
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
    <>
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
      {isStar() &&
        barrel.path.map((p, index) => (
          <div
            className="Path Block"
            key={barrel.id + "_" + index}
            style={{ left: p.x, bottom: p.y }}
          />
        ))}
    </>
  );
};

export const BarrelFactory: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { debug } = useSelector((state: RootState) => state.options);

  const barrelFactory = useSelector((state: RootState) => state.barrelFactory);
  const { players } = useSelector((state: RootState) => state.roster);
  const completed = getCompleteCount(players);
  const rolled = barrelFactory.height - 25;

  const shift = useMemo(() => {
    const shiftUnits = 25; //barrelFactory.height / 4;
    const shift = completed * shiftUnits;
    if (shift > rolled || completed >= 4) {
      return rolled;
    }
    return shift;
  }, [completed, barrelFactory.height]);

  const barrelStack = useMemo(() => {
    const count = Math.floor(
      (barrelFactory.width * barrelFactory.height) / 25 ** 2
    );
    return Array.from({ length: count }, (_, i) => (
      <div className="Block Barrel Round" key={i} />
    ));
  }, [barrelFactory.width, barrelFactory.height]);

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
      {!debug && (
        <>
          <div
            className={`Stack Block ${shift === rolled ? "Rolled" : ""}`}
            style={{
              left: barrelFactory.x - barrelFactory.width / 2.5,
              bottom: barrelFactory.y + (25 - barrelFactory.height) / 2,
              width: barrelFactory.width,
              height: barrelFactory.height,
            }}
          >
            {barrelStack}
          </div>
          <div
            className={`BarrelFactory Jumpman Block ​ ${
              shift === rolled ? "Rolled" : ""
            }`}
            style={{
              left: barrelFactory.x,
              bottom: barrelFactory.y - barrelFactory.height / 3.5,
            }}
          />
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
      )}
    </>
  );
};
