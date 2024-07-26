import { name, repository, contact, support } from "../package.json";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        DK<span>{"<Redux/>"}</span>
      </h1>
      <div className="Content">
        <div className="Manual">
          <u>HOW TO PLAY</u>
          <div>
            <p>
              &nbsp;Move: ARROW KEYS <br />
              &nbsp;Jump: SPACE
            </p>
            <p>
              Pause: ENTER <br />
              Reset: F5
            </p>
            <p>
              &nbsp;Zoom: F11 <br />
              &nbsp;Mode: F8
            </p>
            <p>
              /////: //
              <span className="Gravity Hint">
                x.80665... m/s <sup>2</sup>
              </span>
              <br />
              Debug: F13 <span className="Hash Hint">/#</span>
            </p>
            &nbsp;Code: F12
            <span className="Code Hint">
              {"<HTML/>  CSS{.dk}?"}
              <div className="dk" />
            </span>
          </div>
        </div>
        <Game />
        <div className="Manual">
          <u>PLAYER SELECT</u>
          <div>
            <p>
              M: Jumpman
              <br />
              D:
              <a href="https://fer-nando-machado.github.io/react-deutschbox/">
                {"<DeutschBox/>"}
              </a>
              <br />
              +: Duck Hunt<span className="Player Hint">Touch!</span>
            </p>
            ?: /////////<span className="Player Hint">DK is real</span>
          </div>
        </div>
      </div>
      <div className="Footer">
        <a href={`mailto:${contact}`} className="Button">
          Contact
        </a>
        <a href={repository.link}>
          <img
            src={GitHub}
            alt={`${name} @ GitHub`}
            title={`${name} @ GitHub`}
            height={24}
          />
        </a>
        <a href={support} className="Button">
          Support
        </a>
      </div>
    </div>
  );
};

export default App;
