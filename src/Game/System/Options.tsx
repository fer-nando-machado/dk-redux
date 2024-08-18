import { author } from "../../../package.json";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import useHash from "../Hooks/useHash";
import useMusic from "../Hooks/useMusic";
import useKeyboard, { dispatchKeyDown } from "../Hooks/useKeyboard";
import { setPlayer } from "./RosterSlice";
import Roster from "./Roster";
import Music from "./Music";
import Version from "./Version";
import {
  setPaused,
  toggleFilters,
  togglePaused,
  toggleGravity,
  enableDebug,
  toggleLowFPS,
} from "./OptionsSlice";
import "./Options.scss";

export type Options = {
  paused: boolean;
  lowFPS: boolean;
  gravity: boolean;
  filters: boolean;
  maker: boolean;
  debug: boolean;
};

type Option = {
  name: string;
  value: boolean | string;
  onClick?: () => void;
};

const Option: React.FC<Option> = ({ name, value, onClick }) => {
  const display = typeof value === "boolean" ? (value ? "ON" : "OFF") : value;
  return (
    <div className="Option">
      {name}:
      <span
        className={`${onClick ? "Clickable" : ""} LargerBoldItalic`}
        onClick={onClick}
      >
        {display}
      </span>
    </div>
  );
};

const Options: React.FC = () => {
  const hash = useHash();
  const dispatch: StoreDispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);

  const dispatchToggleLowFPS = () => dispatch(toggleLowFPS());
  const dispatchToggleFilters = () => dispatch(toggleFilters());
  const dispatchTogglePaused = () => dispatch(togglePaused());
  const dispatchToggleGravity = () => dispatch(toggleGravity());
  const dispatchEnableDebug = () => dispatch(enableDebug());
  const dispatchSetPlayer = () => dispatch(setPlayer("​"));
  const dispatchUnpause = () => dispatch(setPaused(false));
  const dispatchPause = () => dispatch(setPaused(true));
  const dispatchReset = () => {
    if (options.maker || options.paused) return;
    window.dispatchEvent(new CustomEvent("level:reset"));
  };

  useMusic();

  useKeyboard({
    key: "F2",
    onKeyDown: dispatchToggleLowFPS,
  });
  useKeyboard({
    key: "F4",
    onKeyDown: dispatchReset,
  });
  useKeyboard({
    key: "F8",
    onKeyDown: dispatchToggleFilters,
  });
  useKeyboard({
    key: "F9",
    onKeyDown: dispatchToggleGravity,
  });
  useKeyboard({
    key: "F13",
    onKeyDown: dispatchEnableDebug,
  });
  useKeyboard({
    key: "Enter",
    onKeyDown: dispatchTogglePaused,
  });
  useKeyboard({
    key: then.slice(-4),
    onKeyDown: dispatchSetPlayer,
  });
  useEffect(() => {
    dispatchKeyDown(hash);
  }, [hash]);

  useEffect(() => {
    if (options.debug) return;

    window.addEventListener("blur", dispatchPause);
    return () => {
      window.removeEventListener("blur", dispatchPause);
    };
  }, [options.debug]);

  return (
    <>
      {options.paused && (
        <div className="Options">
          <div>
            <Version />
            <u>GRAPHICS</u>
            <div className="Toggles">
              <Option
                name="FILTERS"
                value={options.filters}
                onClick={dispatchToggleFilters}
              />
              <Option
                name="REFRESH"
                value={options.lowFPS ? "30FPS" : "60FPS"}
                onClick={dispatchToggleLowFPS}
              />
            </div>
            <Music />
          </div>
          <div className="Paused" onClick={dispatchUnpause} />
          <div>
            <Roster />
            <div className="Credits" onClick={dispatchUnpause}>
              <div className="Date">
                <span>{then}</span>
                <span>{now}</span>
              </div>
              Made with<span className="emoji">❤️</span>by {author}
            </div>
          </div>
        </div>
      )}
      {options.filters && <div className="Filters" />}
      {options.debug && (
        <div className="Debug">
          DEBUG
          {options.maker && <>/MAKER</>}
          <span onClick={dispatchToggleLowFPS}>
            /{options.lowFPS ? "30" : "60"}FPS
          </span>
          {!options.gravity && (
            <span onClick={dispatchToggleGravity}>/NO_GRAVITY</span>
          )}
          {options.paused && <span onClick={dispatchTogglePaused}>/PAUSE</span>}
        </div>
      )}
    </>
  );
};

export const then = "JUL 09 1981";
const now = new Date().toDateString().slice(4).toUpperCase();

export default Options;
