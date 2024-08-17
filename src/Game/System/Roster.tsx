import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { setPlayer, winPlayer } from "./RosterSlice";
import "./Roster.scss";

export type RosterRecord = Record<string, Features>;
export type Features = {
  code: string;
  weapon?: JSX.Element;
  touch?: boolean;
  help?: string;
};
export const ROSTER: RosterRecord = {};
const MAX_PLAYERS = 5;

export type PlayerRecord = Record<string, Player>;
export type Player = {
  code: string;
  complete?: boolean;
  speedRun?: number;
  highScore?: number;
};
export type Roster = {
  players: PlayerRecord;
  current: string;
};

export const getCompleteCount = (players: PlayerRecord) => {
  return Object.values(players).filter((player) => player.complete).length;
};

const Roster: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { players, current } = useSelector((state: RootState) => state.roster);
  const dispatchSetPlayer = (code: string) => dispatch(setPlayer(code));
  const dispatchWinPlayer = () =>
    dispatch(
      winPlayer({
        code: current,
        highScore: Math.floor(1000 + Math.random() * 9000),
        speedRun: Math.floor(100 + Math.random() * 900),
      })
    );

  useKeyboard({
    key: "0",
    onKeyDown: dispatchWinPlayer,
  });

  const completed = getCompleteCount(players);
  const unlocked = Object.values(players);
  const missing = MAX_PLAYERS - unlocked.length;
  const message = `${missing} PLAYER${missing > 1 ? "S" : ""}`;

  const rate =
    missing === 0
      ? ((unlocked.length + completed) * 100) / (MAX_PLAYERS * 2)
      : (unlocked.length * 100) / MAX_PLAYERS;

  return (
    <div className="Roster">
      <u>PLAYER SELECT</u>
      <div className="Completion LargerBoldItalic">{rate.toFixed(0)}%</div>
      <div className="Players">
        {unlocked.map(({ code, complete, highScore, speedRun }) => {
          const isCurrent = code === current ? "Current" : "";
          return (
            <div
              key={code}
              className={`Select ${isCurrent}`}
              onClick={() => dispatchSetPlayer(code)}
            >
              <div className={`Jumpman Block right ${code}`}>
                {ROSTER[code]?.weapon}
              </div>
              {complete && (
                <div className="Records">
                  {isCurrent ? (
                    <>
                      <span className="emoji">🏆</span>
                      {highScore} <br />
                      <span className="emoji">⏱</span>
                      {speedRun}s
                    </>
                  ) : (
                    <span className="emoji">⭐</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="Message">
        {missing > 0 ? (
          <>MISSING: {message}</>
        ) : (
          <span className="LargerBoldItalic">
            {rate < 100 ? (
              <>EVERYBODY IS HERE! </>
            ) : (
              <>
                YOU ARE A SUPER PLAYER!
                <span className="emoji">⭐⭐⭐⭐⭐</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Roster;
