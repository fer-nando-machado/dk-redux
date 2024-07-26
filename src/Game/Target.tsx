import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";
import { addPoints } from "./StatusSlice";
import { isDuckHunting } from "./Player/Dog";
import { Points } from "./Status";

type Target = {
  points: Points;
  callback: () => void;
  always?: boolean;
};

const Target: React.FC<Target> = ({ points, callback, always }) => {
  const dispatch: StoreDispatch = useDispatch();

  const displayAim = isDuckHunting();
  const isClickable = always || displayAim;

  const onClickTarget = () => {
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
