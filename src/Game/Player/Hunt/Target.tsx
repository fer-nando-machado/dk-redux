import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../../reduxStore";
import { Points } from "../../System/Status";
import { addPoints } from "../../System/StatusSlice";
import { isDuckHunting } from "./Dog";
import "./Target.scss";

type Target = {
  points: Points;
  callback: () => void;
  always?: boolean;
};

const Target: React.FC<Target> = ({ points, callback, always }) => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);

  const isAbove = points.position.y >= jumpman.y;
  const isHunting = isDuckHunting();
  const isClickable = isAbove && (isHunting || always);

  const onClickTarget = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isClickable) return;
    dispatch(addPoints(points));
    callback();
  };

  return isClickable ? (
    <div
      onClick={onClickTarget}
      className={`Target ${isHunting ? "Crosshair" : ""}`}
    />
  ) : null;
};

export default Target;
