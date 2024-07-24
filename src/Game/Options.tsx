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

type Option = {
  name: string;
  value: boolean;
  onClick?: () => void;
};

const Option: React.FC<Option> = ({ name, value, onClick }) => {
  return (
    <div className="Option">
      {name}: <span onClick={onClick}>{value ? "ON" : "OFF"}</span>
    </div>
  );
};

const Options: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);

  const onFilters = () => dispatch(toggleFilters());
  const onGravity = () => dispatch(toggleGravity());
  const onPaused = () => dispatch(togglePaused());

  useKeyboard({
    key: "F8",
    onKeyDown: () => {},
    onKeyUp: onFilters,
  });

  useKeyboard({
    key: "F9",
    onKeyDown: () => {},
    onKeyUp: onGravity,
  });

  useKeyboard({
    key: "Enter",
    onKeyDown: () => {},
    onKeyUp: onPaused,
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

  return (
    <>
      {options.filters && <div className="Filters" />}
      {options.paused && (
        <div className="Options">
          <u>{name}</u> <small>v{version}</small>
          <p>{description}</p>
          <p>Made with ❤️ by {author}</p>
          <p>
            <u>OPTIONS</u>
          </p>
          <Option name="GRAVITY" value={options.gravity} onClick={onGravity} />
          <Option name="FILTERS" value={options.filters} onClick={onFilters} />
          <div className="Pause" onClick={onFocus}>
            PAUSE
          </div>
        </div>
      )}
    </>
  );
};

export default Options;
