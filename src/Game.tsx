import "./Game.scss";
import { Boundaries } from "./Position";
import { BarrelFactory } from "./Barrel";
import { Provider } from "react-redux";
import { Store } from "./Store";
import Jumpman from "./Jumpman";

export const FPS = 1000 / 60;

const Game = () => {
  return (
    <Provider store={Store}>
      <div
        className="Game"
        style={{ width: Boundaries.max.x, height: Boundaries.max.y }}
      >
        <Jumpman />
        <BarrelFactory />
      </div>
    </Provider>
  );
};

export default Game;
