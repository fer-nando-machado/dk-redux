import { version } from "../../package.json";
import { Provider } from "react-redux";
import { Store } from "./Store";
import Pause from "./Pause";
import "./Game.scss";
import Level from "./Level";

export type Game = {
  paused: boolean;
};

const Game = () => {
  return (
    <Provider store={Store}>
      <div className="Game">
        {version}
        <Level />
        <Pause />
      </div>
    </Provider>
  );
};

export default Game;
