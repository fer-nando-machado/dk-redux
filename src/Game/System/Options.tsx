import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../Store";
import useHash from "../Hooks/useHash";
import useKeyboard, { dispatchKeyDown } from "../Hooks/useKeyboard";
import { name, version, author, description } from "../../../package.json";
import PlayerSelect, { Player, PlayerSelectMap } from "./PlayerSelect";
import {
  setPaused,
  setPlayer,
  toggleDebug,
  toggleFilters,
  toggleGravity,
  togglePaused,
  winPlayer,
} from "./OptionsSlice";
import "./Options.scss";

export type Options = {
  player: Player;
  playerSelect: PlayerSelectMap;
  paused: boolean;
  gravity: boolean;
  filters: boolean;
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
        className={`${onClick ? "clickable" : ""} LargerBoldItalic`}
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

  const dispatchSetPlayer = (p: string) => dispatch(setPlayer(p));
  const dispatchToggleFilters = () => dispatch(toggleFilters());
  const dispatchToggleGravity = () => dispatch(toggleGravity());
  const dispatchTogglePaused = () => dispatch(togglePaused());
  const dispatchToggleDebug = () => dispatch(toggleDebug());
  const dispatchPause = () => dispatch(setPaused(true));
  const dispatchUnpause = () => dispatch(setPaused(false));

  const dispatchWinPlayer = () => dispatch(winPlayer());
  useKeyboard({
    key: "W",
    onKeyDown: dispatchWinPlayer,
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
    onKeyDown: dispatchToggleDebug,
  });

  useKeyboard({
    key: "Enter",
    onKeyDown: dispatchTogglePaused,
  });

  useKeyboard({
    key: then.slice(-4),
    onKeyDown: () => dispatchSetPlayer("​"),
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
  }, []);

  return (
    <>
      {options.paused && (
        <div className="Options">
          <div>
            <u>{name}</u> <small>v{version}</small>
            <p>{description}</p>
            <u>OPTIONS</u>
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
            {options.debug && (
              <Option
                name="DEBUG"
                value={options.debug}
                onClick={dispatchToggleDebug}
              />
            )}
          </div>
          <div className="Paused" onClick={dispatchUnpause}>
            PAUSE
          </div>
          <div>
            <PlayerSelect />
            <div className="Credits">
              <div className="Date">
                <span>{then}</span>
                <span>{now}</span>
              </div>
              Made with <span className="emoji">❤️</span> by {author}
            </div>
          </div>
        </div>
      )}
      {options.filters && <div className="Filters" />}
      {options.debug && <div className="Debug" />}
    </>
  );
};

export const then = "JUL 09 1981";
const now = new Date(Date.now()).toDateString().slice(4).toUpperCase();

export default Options;
