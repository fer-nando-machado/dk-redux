import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Store, StorePersistor } from "./reduxStore";
import Level, { CustomLevel } from "./Level";
import Status from "./System/Status";
import Options from "./System/Options";
import "./index.scss";

export type Game = {
  customLevel?: CustomLevel;
};

const Game: React.FC<Game> = ({ customLevel }) => {
  return (
    <div className="Screen">
      <Provider store={Store}>
        <PersistGate persistor={StorePersistor}>
          <div className="Game">
            <Level {...customLevel} />
            <Status />
            <Options />
          </div>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Game;
