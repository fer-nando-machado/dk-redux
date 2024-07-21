import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store";
import { useKeyboard } from "./Keyboard";
import { setPaused, togglePaused } from "./GameSlice";

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
