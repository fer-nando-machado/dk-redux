import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useIntervalTimed } from "../Hooks/useInterval";
import { Position } from "../Level/Position";
import { resetLevel } from "../Level/LevelSlice";
import { setPaused } from "./OptionsSlice";
import { clearMessage, clearPoints } from "./StatusSlice";
import "./Status.scss";

export type Points = {
  position: Position;
  value: number;
};

export type Status = {
  score: number;
  points?: Points;
  message?: string;
};

const Status: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { score } = useSelector((state: RootState) => state.status);

  const clickPause = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(setPaused(true));
  };

  const clickReset = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(resetLevel());
  };

  return (
    <div className="Status">
      <a href="#" onClick={clickPause}>
        PAUSE
      </a>
      {score}
      <a href="#" onClick={clickReset}>
        RESET
      </a>
      <PointsDisplay />
      <MessageDisplay />
    </div>
  );
};

const PointsDisplay: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { points } = useSelector((state: RootState) => state.status);

  useIntervalTimed(() => dispatch(clearPoints()), 777 + Math.random());

  if (!points) return null;
  return (
    <div
      className="Block Points"
      style={{
        left: points.position.x,
        bottom: points.position.y,
      }}
    >
      {points.value}
    </div>
  );
};

const MessageDisplay: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.status);

  useIntervalTimed(() => dispatch(clearMessage()), 2500 + Math.random());

  if (!message) return null;
  return <div className="Block Message">{message}</div>;
};

export default Status;
