import "./Game.scss";
import { version } from "../package.json";
import { Boundaries } from "./Position";
import { BarrelFactory } from "./Barrel";
import { Provider } from "react-redux";
import { Store } from "./Store";
import Jumpman from "./Jumpman";
import Pause from "./Pause";

// make it default in useInterval
export const FPS = 1000 / 60;

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
        v{version} <br /> <br />
        use directional keys to Walk and press SPACE to Jump
        <Jumpman />
        <BarrelFactory />
        <Pause />
      </div>
    </Provider>
  );
};

export default Game;
