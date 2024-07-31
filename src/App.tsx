import { name, repository, contact, support } from "../package.json";
import { useState } from "react";
import { CustomLevel } from "./Game/Level";
import Game from "./Game";
import Icon from "./Icon";
import AppIcon from "/favicon.ico";
import GitHub from "/GitHub.svg?url";
import "./App.scss";

const exampleLevel = `{
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
  const [json, setJSON] = useState<string>(exampleLevel);
  const [level, setLevel] = useState<CustomLevel>();
  const [error, setError] = useState<string>();
  const [isMaker, setMaker] = useState(false);

  const handleEnter = () => {
    if (isMaker) return;
    setMaker(true);
    setLevel(JSON.parse(json));
  };
  const handleExit = () => {
    setMaker(false);
    setLevel(undefined);
  };

  const stopPropagation = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJSON(e.target.value);
    try {
      const parsedLevel: CustomLevel = JSON.parse(e.target.value);
      if (!parsedLevel.platforms) parsedLevel.platforms = [];
      setLevel(parsedLevel);
      setError(undefined);
    } catch (e: any) {
      setError(e.toString());
    }
  };

  const handleReset = () => {
    setJSON(exampleLevel);
    setLevel(JSON.parse(exampleLevel));
    setError(undefined);
  };

  return (
    <div className="App">
      <h1>
        <Icon />
        DK<span>{"<Redux/>"}</span>
      </h1>
      <main>
        <aside>
          <div className={`Manual ${isMaker ? "Hidden" : ""}`}>
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
                  FX.80665... m/s<sup>2</sup>
                </span>
                <br />
                Debug: F13
              </p>
              &nbsp;Code: F12
              <span className="Code Hint">{"<HTML/> CSS{.dk}?"}</span>
            </div>
          </div>
          <div className={`Manual ${isMaker ? "Hidden" : ""}`}>
            <u>DOWNLOAD</u>
            <span className="Download">
              <img src={AppIcon} alt="DK-Redux App Icon" />
              Add to Home Screen
            </span>
          </div>
          <div className={`Manual ${isMaker ? "Maker" : "Hidden"}`}>
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
              value={json}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className={error ? "Error" : ""}
              onChange={handleChange}
              onFocus={handleEnter}
              onKeyDown={stopPropagation}
              onKeyUp={stopPropagation}
            />
            {isMaker && (
              <div className="Console" title={error}>
                {error}
              </div>
            )}
          </div>
          <div className={`Manual ${isMaker ? "Hidden" : ""}`}>
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
          <div className={`Manual ${isMaker ? "Hidden" : ""}`}>
            <u>MUSIC SELECT</u>
            <div>
              <iframe
                src="https://www.youtube-nocookie.com/embed/d-b8gHsWEJo"
                title="Music Select"
              />
            </div>
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
