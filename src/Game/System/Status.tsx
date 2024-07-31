import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { Position } from "../Level/Position";
import { setPaused } from "./OptionsSlice";
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
  message?: string;
};

const Status: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { score, points, message } = useSelector(
    (state: RootState) => state.status
  );

  const [showPoints, setPoints] = useState(1);
  useEffect(() => {
    if (!points) return;
    setPoints(1);
    const timeout = setTimeout(() => setPoints(0), 1000);
    return () => clearTimeout(timeout);
  }, [points]);

  const [showMessage, setMessage] = useState(1);
  useEffect(() => {
    if (!message) return;
    setMessage(1);
    const timeout = setTimeout(() => setMessage(0), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

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
        {points && (
          <div
            className="Block Points"
            style={{
              left: points.position.x,
              bottom: points.position.y,
              opacity: showPoints,
            }}
          >
            {points.value}
          </div>
        )}
        {message && (
          <div className="Block Message" style={{ opacity: showMessage }}>
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default Status;
