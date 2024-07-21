import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { setPaused, togglePaused } from "./GameSlice";
import useKeyboard from "./useKeyboard";

const Pause: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const paused = useSelector((state: RootState) => state.game.paused);

  const onKeyDown = () => {
    dispatch(togglePaused());
  };

  const onBlur = () => {
    dispatch(setPaused(true));
  };

  useKeyboard({
    key: "Enter",
    onKeyDown: () => onKeyDown(),
    onKeyUp: () => {},
  });

  useEffect(() => {
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return <div className="Pause">{paused ? "PAUSE" : ""}</div>;
};

export default Pause;
