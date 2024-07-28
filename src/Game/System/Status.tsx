import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../Store";
import { setPaused } from "./OptionsSlice";
import { Position } from "../Position";
import "./Status.scss";

export type Points = {
  position: Position;
  value: number;
  // convert to string and turn Points into Alert or something.
  // allow to styles (basic for Points, custom for important msg)
};

export type Status = {
  score: number;
  points?: Points;
};

const Status: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { score, points } = useSelector((state: RootState) => state.status);

  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    if (!points) return;
    setOpacity(1);
    const timeout = setTimeout(() => setOpacity(0), 1000);
    return () => clearTimeout(timeout);
  }, [points]);

  const clickPause = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(setPaused(true));
  };

  const clickRefresh = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <div className="Status">
        <a href="#" onClick={clickPause}>
          PAUSE
        </a>
        {score}
        <a href="#" onClick={clickRefresh}>
          RESET
        </a>
      </div>
      {points && (
        <div
          className="Block Points"
          style={{
            left: points.position.x,
            bottom: points.position.y,
            opacity: opacity,
          }}
        >
          {points.value}
        </div>
      )}
    </>
  );
};

export default Status;
