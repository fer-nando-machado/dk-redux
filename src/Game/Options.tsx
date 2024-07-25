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

  const dispatchToggleFilters = () => dispatch(toggleFilters());
  const dispatchToggleGravity = () => dispatch(toggleGravity());
  const dispatchTogglePaused = () => dispatch(togglePaused());
  const dispatchPause = () => dispatch(setPaused(true));
  const dispatchUnpause = () => dispatch(setPaused(false));

  useKeyboard({
    key: "F8",
    onKeyUp: dispatchToggleFilters,
  });

  useKeyboard({
    key: "F9",
    onKeyUp: dispatchToggleGravity,
  });

  useKeyboard({
    key: "Enter",
    onKeyUp: dispatchTogglePaused,
  });

  useEffect(() => {
    if (DEBUG) return;
    window.addEventListener("blur", dispatchPause);
    return () => {
      window.removeEventListener("blur", dispatchPause);
    };
  }, []);

  return (
    <>
      {options.filters && <div className="Filters" />}
      {options.paused && (
        <div className="Options">
          <u>{name}</u> <small>v{version}</small>
          <p>{description}</p>
          <p>
            <u>OPTIONS</u>
          </p>
          <Option
            name="FILTERS"
            value={options.filters}
            onClick={dispatchToggleFilters}
          />
          {!options.gravity && (
            <Option
              name="GRAVITY"
              value={options.gravity}
              onClick={dispatchToggleGravity}
            />
          )}
          <div className="Pause" onClick={dispatchUnpause}>
            PAUSE
          </div>
          <span className="Credits">Made with ❤️ by {author}</span>
        </div>
      )}
    </>
  );
};

export default Options;