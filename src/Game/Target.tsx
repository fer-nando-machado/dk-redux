import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";
import { addScore } from "./StatusSlice";
import { isDuckHunting } from "./Player/Dog";

type Target = {
  points: number;
  callback: () => void;
  always?: boolean;
};

const Target: React.FC<Target> = ({ points, callback, always }) => {
  const dispatch: StoreDispatch = useDispatch();

  const displayAim = isDuckHunting();
  const isClickable = always || displayAim;

  const onClickTarget = () => {
    if (!isClickable) return;
    callback();
    dispatch(addScore(points));
  };

  return (
    <div
      onClick={onClickTarget}
      className={`Target ${displayAim ? "Aim" : ""}`}
    ></div>
  );
};

export default Target;
