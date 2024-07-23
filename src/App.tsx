import { name, repositoryWeb } from "../package.json";
import GitHub from "/GitHub.svg?url";
import Game from "./Game/Game";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <b>DK Redux</b>
      <div className="Content">
        <div className="Manual">
          <u>HOW TO PLAY</u>
          <br /> <br />
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
          <u>PLAYER SELECT</u>
          <br /> <br />
          <ul>
            <li>M Jumpman</li>
            <li>
              {"D "}
              <a href="https://fer-nando-machado.github.io/react-deutschbox/">
                {"<DeutschBox/>"}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <a href={repositoryWeb}>
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
