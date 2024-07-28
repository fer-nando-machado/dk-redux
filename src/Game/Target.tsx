import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";
import { Points } from "./System/Status";
import { addPoints } from "./System/StatusSlice";
import { isDuckHunting } from "./Player/Dog";
import "./Target.scss";

type Target = {
  points: Points;
  callback: () => void;
  always?: boolean;
};

const Target: React.FC<Target> = ({ points, callback, always }) => {
  const dispatch: StoreDispatch = useDispatch();

  const displayAim = isDuckHunting();
  const isClickable = always || displayAim;

  const onClickTarget = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isClickable) return;
    dispatch(addPoints(points));
    callback();
  };

  return (
    <div
      onClick={onClickTarget}
      className={`Target ${displayAim ? "Aim" : ""}`}
    ></div>
  );
};

export default Target;
