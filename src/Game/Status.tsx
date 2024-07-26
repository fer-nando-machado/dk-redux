import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "./Store";
import { setPaused } from "./OptionsSlice";
import "./Status.scss";

export type Status = {
  score: number;
};

const Status: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { score } = useSelector((state: RootState) => state.status);

  const clickPause = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(setPaused(true));
  };

  const clickRefresh = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className="Status">
      <a href="#" onClick={clickPause}>
        PAUSE
      </a>
      {score}
      <a href="#" onClick={clickRefresh}>
        RESET
      </a>
    </div>
  );
};

export default Status;
