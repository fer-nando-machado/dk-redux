import { name, repository, contact, support } from "../package.json";
import Icon from "./Icon";
import AppIcon from "/favicon.ico";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";
import Maker from "./Maker";
import Manual from "./Manual";
import Joypad from "./Joypad";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        <Icon />
        DK<span>{"<Redux/>"}</span>
      </h1>
      <main>
        <Manual>
          {({ isMaker }) => (
            <Maker isMaker={isMaker}>
              {({ customLevel }) => <Game customLevel={customLevel} />}
            </Maker>
          )}
        </Manual>
      </main>
      <nav>
        <span className="Download">
          <img src={AppIcon} alt="DK-Redux App Icon" />
          Add to Home Screen
        </span>
        <Joypad />
        <a href="#" className="Button" onClick={() => window.location.reload()}>
          Restart
        </a>
      </nav>
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
