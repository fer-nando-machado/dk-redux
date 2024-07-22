import { version } from "../package.json";
import { Provider } from "react-redux";
import { Store } from "./Store";
import { Boundaries } from "./Position";
import Jumpman from "./Jumpman";
import Pause from "./Pause";
import "./Game.scss";
import Level from "./Level";

export type Game = {
  paused: boolean;
};

const Game = () => {
  return (
    <Provider store={Store}>
      <div
        className="Game"
        style={{ width: Boundaries.max.x, height: Boundaries.max.y }}
      >
        {version}
        <Jumpman />
        <Level />
        <Pause />
      </div>
    </Provider>
  );
};

export default Game;
