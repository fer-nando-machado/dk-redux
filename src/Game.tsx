import { version } from "../package.json";
import { Boundaries } from "./Position";
import { BarrelFactory } from "./Barrel";
import { Provider } from "react-redux";
import { Store } from "./Store";
import Jumpman from "./Jumpman";
import Pause from "./Pause";
import "./Game.scss";
import Platform from "./Platform";

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

        <Platform x={25} y={35} length={450} />

        <Platform x={25} y={155} length={450} angle={10} />
        <Platform x={25} y={200} length={300} angle={-10} />

        <Platform x={25} y={300} length={200} angle={-5} />
        <Platform x={225} y={317} length={200} angle={5} />

        <Platform x={100} y={400} length={400} angle={-45} />
        <Pause />
      </div>
    </Provider>
  );
};

export default Game;
