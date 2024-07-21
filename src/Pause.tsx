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
  const onFocus = () => {
    dispatch(setPaused(false));
  };

  useKeyboard({
    key: "Enter",
    onKeyDown: () => onKeyDown(),
    onKeyUp: () => {},
  });

  useEffect(() => {
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return paused ? <div className="Pause" /> : <></>;
};

export default Pause;
