import { Provider } from "react-redux";
import { Store } from "./reduxStore";
import Level, { CustomLevel } from "./Level";
import Status from "./System/Status";
import Options from "./System/Options";
import "./index.scss";

export type Game = {
  level?: CustomLevel;
};

const Game: React.FC<Game> = ({ level }) => {
  return (
    <Provider store={Store}>
      <div className="Game">
        <Level {...level} />
        <Status />
        <Options />
      </div>
    </Provider>
  );
};

export default Game;
