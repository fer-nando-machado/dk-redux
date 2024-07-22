import "./App.scss";
import { name, repository } from "../package.json";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <b>DK Redux</b>
      <Game />
      <a href={repository.url}>
        <img
          src={GitHub}
          alt={`${name} @ GitHub`}
          title={`${name} @ GitHub`}
          height={25}
        />
      </a>
    </div>
  );
}

export default App;
