import { version } from "../package.json";
import { Boundaries } from "./Position";
import { BarrelFactory } from "./Barrel";
import { Provider } from "react-redux";
import { Store } from "./Store";
import Jumpman from "./Jumpman";
import Pause from "./Pause";
import "./Game.scss";

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
        <BarrelFactory />
        <Pause />
      </div>
    </Provider>
  );
};

export default Game;
