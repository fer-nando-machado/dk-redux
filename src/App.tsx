import { name, repository, contact, support } from "../package.json";
import Game from "./Game";
import Icon from "./Icon";
import AppIcon from "/favicon.ico";
import GitHub from "/GitHub.svg?url";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        <Icon /> DK<span>{"<Redux/>"}</span>
      </h1>
      <main>
        <aside>
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
                Debug: F13
              </p>
              &nbsp;Code: F12
              <span className="Code Hint">{"<HTML/> CSS{.dk}?"}</span>
            </div>
          </div>
          <div className="Manual">
            <u>DOWNLOAD</u>
            <p>
              <span className="Download">
                <img src={AppIcon} alt="DK-Redux App Icon" />
                Add to Home Screen
              </span>
            </p>
            PHONE: Android / iOS
          </div>
        </aside>
        <Game />
        <aside>
          <div className="Manual">
            <u>PLAYER SELECT</u>
            <div>
              <p>
                M: Jumpman
                <br />
                D:&nbsp;
                <a href="https://fer-nando-machado.github.io/react-deutschbox/">
                  DeutschBox
                </a>
                <br />
                +: DK Hunt<span className="Player Hint">Touch</span>
              </p>
              ?: ///////////
              <span className="Player Hint">
                is real <br /> 2024
              </span>
            </div>
          </div>
          <div className="Manual">
            <u>LEVEL MAKER</u>
            <p>{"<Game Level={...}/>"}</p>
            <small>&nbsp;&nbsp;(COMING SOON...)</small>
          </div>
        </aside>
      </main>
      <footer>
        <a href={`mailto:${contact}`} className="Button">
          Contact
        </a>
        <a href={repository.link}>
          <img src={GitHub} alt={`${name} @ GitHub`} height={24} />
        </a>
        <a href={support} className="Button">
          Support
        </a>
      </footer>
    </div>
  );
};

export default App;
