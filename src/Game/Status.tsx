import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";
import { setPaused } from "./OptionsSlice";
import "./Status.scss";

const Status = () => {
  const dispatch: StoreDispatch = useDispatch();

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
      <a href="#" onClick={clickRefresh}>
        RESET
      </a>
    </div>
  );
};

export default Status;
