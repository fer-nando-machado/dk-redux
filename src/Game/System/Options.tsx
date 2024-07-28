import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../Store";
import {
  setPaused,
  setPlayer,
  toggleDebug,
  toggleFilters,
  toggleGravity,
  togglePaused,
} from "./OptionsSlice";
import useHash from "../Hooks/useHash";
import useKeyboard, { dispatchKeyDown } from "../Hooks/useKeyboard";
import { name, version, author, description } from "../../../package.json";
import "./Options.scss";

const MAX_PLAYERS = 4;

export type Player = {
  code: string;
  highScore?: number;
  speedyRun?: number;
};

export type PlayerSelect = {
  [code: string]: Player;
};

export type Options = {
  player: Player;
  playerSelect: PlayerSelect;
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

  const unlockedPlayers = Object.values(options.playerSelect);
  const missingPlayers = MAX_PLAYERS - unlockedPlayers.length;
  const missingMessage = `${missingPlayers} PLAYER${
    missingPlayers > 1 ? "S" : ""
  }`;
  const completionRate = (unlockedPlayers.length * 100) / MAX_PLAYERS;

  return (
    <>
      {options.paused && (
        <div className="Options">
          <div>
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
            {/** extract to component */}
            <div className="PlayerSelect">
              <u>PLAYER SELECT</u>
              <div className="CompletionRate LargerBoldItalic">
                {completionRate === 100 && <span className="emoji">⭐</span>}
                {completionRate}%
              </div>
              <div className="Players">
                {unlockedPlayers.map(({ code }) => {
                  const isActive = code === options.player.code ? "Active" : "";
                  return (
                    <div
                      key={code}
                      className={`Select ${isActive}`}
                      onClick={() => dispatchSetPlayer(code)}
                    >
                      <div className={`Jumpman Block right ${code}`}>
                        {/** TODO generalize optional decoration acessory */}
                        {code == "DH" ? "oo" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
              {missingPlayers > 0 ? (
                <Option name="MISSING" value={missingMessage} />
              ) : (
                <div className="LargerBoldItalic">EVERYBODY IS HERE!</div>
              )}
            </div>
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
