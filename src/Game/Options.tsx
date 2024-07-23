import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import { setPaused, toggleGravity, togglePaused } from "./OptionsSlice";
import useKeyboard from "./useKeyboard";
import { name, version, description } from "../../package.json";
import "./Options.scss";

export type Options = {
  paused: boolean;
  gravity: boolean;
};

const Options: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { paused, gravity } = useSelector((state: RootState) => state.options);

  useKeyboard({
    key: "Shift",
    onKeyDown: () => dispatch(toggleGravity()),
    onKeyUp: () => {},
  });

  useKeyboard({
    key: "Enter",
    onKeyDown: () => dispatch(togglePaused()),
    onKeyUp: () => {},
  });

  const onBlur = () => dispatch(setPaused(true));
  const onFocus = () => dispatch(setPaused(false));

  useEffect(() => {
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return paused ? (
    <div className="Options" onClick={onFocus}>
      <u>{name}</u> <small>v{version}</small>
      <br /> <br />
      {description}
      <br /> <br />
      <u>OPTIONS</u>
      <br /> <br />
      GRAVITY:{" "}
      <b>
        <i>{gravity ? "ON" : "OFF"}</i>
      </b>
    </div>
  ) : (
    <></>
  );
};

export default Options;
