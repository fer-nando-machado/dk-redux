import { Provider } from "react-redux";
import { Store } from "./reduxStore";
import Level, { CustomLevel } from "./Level";
import Status from "./System/Status";
import Options from "./System/Options";
import "./index.scss";

export type Game = {
  customLevel?: CustomLevel;
};

const Game: React.FC<Game> = ({ customLevel }) => {
  return (
    <Provider store={Store}>
      <div className="Screen">
        <div className="Game">
          <Level {...customLevel} />
          <Status />
          <Options />
        </div>
      </div>
    </Provider>
  );
};

export default Game;
