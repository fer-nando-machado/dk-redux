import { name, repository, contact, support } from "../package.json";
import { useState } from "react";
import { CustomLevel } from "./Game/Level";
import Game from "./Game";
import Icon from "./Icon";
import AppIcon from "/favicon.ico";
import GitHub from "/GitHub.svg?url";
import "./App.scss";

const demoLevel = `{
  "platforms": [
    { "x": 0, "y": 700, "length": 505 },
    { "x": 25, "y": 625, "length": 25 },
    { "x": 100, "y": 525, "length": 175 },
    { "x": 400, "y": 425, "length": 75 },
    { "x": 0, "y": 325, "length": 425 },
    { "x": 325, "y": 225, "length": 150 },
    { "x": 125, "y": 125, "length": 200 },
    { "x": 25, "y": 25, "length": 450 }
  ],
  "barrelFactory": {
    "x": 50,
    "y": 625
  },
  "jumpman": {
    "x": 25,
    "y": 70
  }
}
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        <Icon />
        DK<span>{"<Redux/>"}</span>
      </h1>
      <GameWithManual />
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

const GameWithManual: React.FC = () => {
  const [input, setInput] = useState<string>(demoLevel);
  const [error, setError] = useState<string>();
  const [level, setLevel] = useState<CustomLevel>();
  const [isMaker, setMaker] = useState(false);

  const handleEnter = () => {
    if (isMaker) return;
    setMaker(true);
    setLevel(JSON.parse(input));
  };
  const handleExit = () => {
    setMaker(false);
    setLevel(undefined);
  };
  const handleReset = () => {
    setInput(demoLevel);
    setLevel(JSON.parse(demoLevel));
    setError(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    try {
      const customLevel: CustomLevel = JSON.parse(e.target.value);
      if (!customLevel.platforms) customLevel.platforms = [];
      setLevel(customLevel);
      setError(undefined);
    } catch (e: any) {
      setError(e.toString());
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
  };

  return (
    <main>
      <aside>
        {!isMaker && (
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
                &nbsp;Mode: F8 <br />
                &nbsp;&nbsp;FPS: F2 <br />
                /////: //
                <span className="Gravity Hint">
                  FX.80665... m/s<sup>2</sup>
                </span>
                <br />
                Debug: F13
              </p>
              &nbsp;Code: F12
              <span className="Code Hint">{"<HTML/> CSS{.dk}?"}</span>
            </div>
          </div>
        )}
        {!isMaker && (
          <div className="Manual">
            <u>DOWNLOAD</u>
            <span className="Download">
              <img src={AppIcon} alt="DK-Redux App Icon" />
              Add to Home Screen
            </span>
          </div>
        )}
        {isMaker && (
          <div className="Manual Maker">
            <u>HOW TO MAKE</u>
            <div>
              <p>
                <span className="Jumpman Block M" />
                {"jumpMan:{}"}
              </p>
              <p>
                <span className="Barrel Block Round" />
                {"barrelFactory:{}"}
              </p>
              <p>
                <span className="Platform Block" />
                {"platforms:[{}]"}
              </p>
            </div>
            {"{ x, y, … }"}
          </div>
        )}
      </aside>
      <Game level={level} />
      <aside>
        <div className={`Manual ${isMaker ? "Maker" : ""}`}>
          <u>LEVEL MAKER</u>
          {isMaker && (
            <div className={`Control ${error ? "Error" : ""}`}>
              <button onClick={handleReset}>RESET</button>
              <button onClick={handleExit}>EXIT</button>
            </div>
          )}
          <textarea
            value={input}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onFocus={handleEnter}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onKeyUp={handleKeyPress}
            className={error ? "Error" : ""}
          />
          {isMaker && (
            <div className="Console" title={error}>
              {error}
            </div>
          )}
        </div>
        {!isMaker && (
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
        )}
        {!isMaker && (
          <div className="Manual">
            <u>MUSIC SELECT</u>
            <p>
              <small>coming soon</small>
            </p>
          </div>
        )}
      </aside>
    </main>
  );
};

export default App;
