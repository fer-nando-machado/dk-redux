import { Provider } from "react-redux";
import { Store } from "./Store";
import Level from "./Level";
import Status from "./Status";
import Options from "./Options";
import "./Block.scss";
import "./index.scss";

export const DEBUG = false;

const Game = () => {
  return (
    <Provider store={Store}>
      <div className="Game">
        <Level />
        <Status />
        <Options />
      </div>
    </Provider>
  );
};

export default Game;
