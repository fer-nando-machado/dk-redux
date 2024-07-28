import { Provider } from "react-redux";
import { Store } from "./Store";
import Level from "./Level";
import Status from "./System/Status";
import Options from "./System/Options";
import "./Block.scss";
import "./index.scss";

const Game: React.FC = () => {
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
