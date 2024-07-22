import { Provider } from "react-redux";
import { Store } from "./Store";
import Level from "./Level";
import Status from "./Status";
import Options from "./Options";
import "./Game.scss";

const Game = () => {
  return (
    <Provider store={Store}>
      <div className="Game">
        <Status />
        <Level />
        <Options />
      </div>
    </Provider>
  );
};

export default Game;
