import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../Store";
import { setPlayer } from "./OptionsSlice";
import "./PlayerSelect.scss";

const MAX_PLAYERS = 4;

export type Player = {
  code: string;
  highScore?: number;
  speedyRun?: number;
};

export type PlayerSelectMap = {
  [code: string]: Player;
};

const PlayerSelect: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);

  const dispatchSetPlayer = (p: string) => dispatch(setPlayer(p));

  const unlocked = Object.values(options.playerSelect);
  const missing = MAX_PLAYERS - unlocked.length;
  const message = `${missing} PLAYER${missing > 1 ? "S" : ""}`;
  const completion = (unlocked.length * 100) / MAX_PLAYERS;

  return (
    <div className="PlayerSelect">
      <u>PLAYER SELECT</u>
      <div className="Completion LargerBoldItalic">
        {completion === 100 && <span className="emoji">⭐</span>}
        {completion}%
      </div>
      <div className="Players">
        {unlocked.map(({ code }) => {
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
      <div className="Message">
        {missing > 0 ? (
          <>MISSING: {message}</>
        ) : (
          <span className="LargerBoldItalic">EVERYBODY IS HERE!</span>
        )}
      </div>
    </div>
  );
};

export default PlayerSelect;
