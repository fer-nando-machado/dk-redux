import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../Store";
import { setPlayer } from "./OptionsSlice";
import "./PlayerSelect.scss";

const MAX_PLAYERS = 4;

export type Player = {
  code: string;
  complete?: boolean;
  speedRun?: number;
  highScore?: number;
};

export type PlayerSelectMap = {
  [code: string]: Player;
};

const PlayerSelect: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player, playerSelect } = useSelector(
    (state: RootState) => state.options
  );
  const dispatchSetPlayer = (p: string) => dispatch(setPlayer(p));

  const unlocked = Object.values(playerSelect);
  const complete = unlocked.filter((player) => player.complete).length;

  const missing = MAX_PLAYERS - unlocked.length;
  const message = `${missing} PLAYER${missing > 1 ? "S" : ""}`;

  const rate =
    missing === 0
      ? ((unlocked.length + complete) * 100) / (MAX_PLAYERS * 2)
      : (unlocked.length * 100) / MAX_PLAYERS;

  return (
    <div className="PlayerSelect">
      <u>PLAYER SELECT</u>
      <div className="Completion LargerBoldItalic">{rate.toFixed(0)}%</div>
      <div className="Players">
        {unlocked.map(({ code, complete, highScore, speedRun }) => {
          const isActive = code === player.code ? "Active" : "";
          return (
            <div
              key={code}
              className={`Select ${isActive}`}
              onClick={() => dispatchSetPlayer(code)}
            >
              <div className={`Jumpman Block right ${code}`}>
                {/** TODO generalize optional decoration (eyes, dress) */}
                {code == "DH" ? "oo" : ""}
              </div>
              {complete && (
                <div className="Records">
                  {isActive ? (
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

export default PlayerSelect;
