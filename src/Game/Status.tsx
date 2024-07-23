import { useDispatch } from "react-redux";
import "./Status.scss";
import { StoreDispatch } from "./Store";
import { setPaused } from "./OptionsSlice";

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

  const then = "JUL 09 1981";
  const now = new Date(Date.now()).toDateString().slice(4).toUpperCase();

  return (
    <div className="Status">
      <div>
        {then} <br /> {now}
      </div>
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
