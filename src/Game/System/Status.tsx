import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useIntervalTimed } from "../Hooks/useInterval";
import { Position } from "../Level/Position";
import { setPaused } from "./OptionsSlice";
import { clearMessage, clearPoints, tickTime } from "./StatusSlice";
import "./Status.scss";

export type Points = {
  position: Position;
  value: number;
};

export type Status = {
  score: number;
  time: number;
  points?: Points;
  message?: string;
};

const Status: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { reached } = useSelector((state: RootState) => state.goal);

  const clickPause = () => {
    dispatch(setPaused(true));
  };

  const clickReset = () => {
    window.dispatchEvent(new CustomEvent("level:reset"));
  };

  return (
    <>
      <div className="Display">
        <HeaderDisplay />
        <PointsDisplay />
        <MessageDisplay />
      </div>
      {!reached && (
        <div className="Status">
          <span onClick={clickPause}>PAUSE</span>
          <span onClick={clickReset}>RESET</span>
        </div>
      )}
    </>
  );
};

const HeaderDisplay: React.FC = () => {
  const { score } = useSelector((state: RootState) => state.status);
  const { reached } = useSelector((state: RootState) => state.goal);
  return (
    <div className="Header">
      <div className="Score">
        <span>{reached ? <span className="emoji">⭐</span> : "SCORE"}</span>
        <small>
          {reached && <span className="emoji">🏆</span>}
          {score}
        </small>
        {reached && (
          <small>
            <span className="emoji">⏱</span>
            {99}s
          </small>
        )}
      </div>
      {!reached && <TimeDisplay />}
    </div>
  );
};

const TimeDisplay: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { time } = useSelector((state: RootState) => state.status);

  useIntervalTimed(() => dispatch(tickTime()), 1000);

  return (
    <div className="Time">
      <span>TIME</span>
      <small>{time}</small>
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
