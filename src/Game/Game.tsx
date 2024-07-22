import { Provider } from "react-redux";
import { Store } from "./Store";
import Options from "./Options";
import "./Game.scss";
import Level from "./Level";

const Game = () => {
  const then = "JUL 09 1981";
  const now = new Date(Date.now()).toDateString().slice(4).toUpperCase();

  return (
    <Provider store={Store}>
      <div className="Game">
        {then} <br /> {now}
        <Level />
        <Options />
      </div>
    </Provider>
  );
};

export default Game;
