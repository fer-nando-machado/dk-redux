import "./App.scss";
import { name, repository } from "../package.json";
import GitHub from "/GitHub.svg?url";
import Game from "./Game/Game";

function App() {
  return (
    <div className="App">
      <b>DK Redux</b>
      <div className="Content">
        <div className="Manual">
          <p>HOW TO PLAY</p>
          Walk: ARROW KEYS
          <br />
          Jump: SPACE
          <br /> <br />
          Pause: ENTER
          <br />
          ?????: SHIFT
          <br /> <br />
          Full Screen: F11
        </div>
        <Game />
        <div className="Manual">
          <p>PLAYER SELECT</p>
          <ul>
            <li>M</li>
          </ul>
        </div>
      </div>
      <a href={repository.url}>
        <img
          src={GitHub}
          alt={`${name} @ GitHub`}
          title={`${name} @ GitHub`}
          height={24}
        />
      </a>
    </div>
  );
}

export default App;
