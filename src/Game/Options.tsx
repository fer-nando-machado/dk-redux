import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "./Store";
import {
  setPaused,
  toggleFilters,
  toggleGravity,
  togglePaused,
} from "./OptionsSlice";
import useKeyboard from "./useKeyboard";
import { name, version, author, description } from "../../package.json";
import { DEBUG } from ".";
import "./Options.scss";

export type Options = {
  paused: boolean;
  gravity: boolean;
  filters: boolean;
};

const Options: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);

  useKeyboard({
    key: "F4",
    onKeyDown: () => {},
    onKeyUp: () => dispatch(toggleFilters()),
  });

  useKeyboard({
    key: "Shift",
    onKeyDown: () => {},
    onKeyUp: () => dispatch(toggleGravity()),
  });

  useKeyboard({
    key: "Enter",
    onKeyDown: () => {},
    onKeyUp: () => dispatch(togglePaused()),
  });

  const onBlur = () => dispatch(setPaused(true));
  const onFocus = () => dispatch(setPaused(false));

  useEffect(() => {
    if (DEBUG) return;
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return options.paused ? (
    <div className="Options" onClick={onFocus}>
      <u>{name}</u> <small>v{version}</small>
      <br /> <br />
      {description}
      <br /> <br />
      Made with ❤️ by {author}
      <br /> <br />
      <u>OPTIONS</u>
      <br /> <br />
      GRAVITY:{" "}
      <b>
        <i>{options.gravity ? "ON" : "OFF"}</i>
      </b>
      <br />
      FILTERS:{" "}
      <b>
        <i>{options.filters ? "ON" : "OFF"}</i>
      </b>
    </div>
  ) : (
    <></>
  );
};

export default Options;
