import { name, repository } from "../package.json";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <b>DK Redux</b>
      <div className="Content">
        <div className="Manual">
          <u>HOW TO PLAY</u>
          <p>
            &nbsp;Walk: ARROW KEYS <br />
            &nbsp;Jump: SPACE
          </p>
          <p>
            Pause: ENTER <br />
            Reset: F5 <br />
            &nbsp;Zoom: F11 <br />
            &nbsp;Mode: F8 <br />
            /////: F_
            <span className="Gravity">
              = _.80665 m/s<sup>2</sup>
            </span>
          </p>
        </div>
        <Game />
        <div className="Manual">
          <u>PLAYER SELECT</u>
          <ul>
            <li>M: Jumpman</li>
            <li>
              D:{" "}
              <a href="https://fer-nando-machado.github.io/react-deutschbox/">
                {"<DeutschBox/>"}
              </a>
            </li>
            <li>*: Duck Hunt</li>
          </ul>
        </div>
      </div>

      <a href={repository.link}>
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
