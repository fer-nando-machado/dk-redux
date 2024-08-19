import { name, repository, contact, support } from "../../package.json";
import Game from "../Game";
import GitHub from "/GitHub.svg?url";
import Icon from "./Icon";
import Maker from "./Maker";
import Manual from "./Manual";
import Online from "./Online";
import Joypad from "./Joypad";
import "./index.scss";

const handleRestart = () => {
  sessionStorage.clear();
  window.location.reload();
};

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
        <Online />
        <a href="#" className="Button" onClick={handleRestart}>
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
      <Joypad />
    </div>
  );
};

export default App;
