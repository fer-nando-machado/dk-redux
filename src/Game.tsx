import "./Game.scss";
import { Boundaries } from "./Position";
import { BarrelFactory } from "./Barrel";
import { Provider } from "react-redux";
import { Store } from "./Store";
import Jumpman from "./Jumpman";
import Pause from "./Pause";

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
        use directional keys to Walk and press SPACE to Jump
        <Jumpman />
        <BarrelFactory />
        <Pause />
      </div>
    </Provider>
  );
};

export default Game;
