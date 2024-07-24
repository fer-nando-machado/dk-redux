import { Provider, useSelector } from "react-redux";
import { RootState, Store } from "./Store";
import Level from "./Level";
import Status from "./Status";
import Options from "./Options";
import "./Block.scss";
import "./index.scss";

export const DEBUG = false;

const Core = () => {
  const { filters } = useSelector((state: RootState) => state.options);
  return (
    <div className={`Game ${filters ? "Filters" : ""}`}>
      <Level />
      <Status />
      <Options />
    </div>
  );
};

const Game = () => {
  return (
    <Provider store={Store}>
      <Core />
    </Provider>
  );
};

export default Game;
