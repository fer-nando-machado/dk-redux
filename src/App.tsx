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
          <br /> <br />
          &nbsp;Walk: ARROW KEYS
          <br />
          &nbsp;Jump: SPACE
          <br /> <br />
          Pause: ENTER
          <br />
          &nbsp;Zoom: F11
          <br />
          &nbsp;&nbsp;???: F9
          <br />
          &nbsp;&nbsp;VFX: F8
          <br />
          <br />
          Reset: F5
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
            <li>? Duck Hunter</li>
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
