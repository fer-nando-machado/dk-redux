import Game from "../Game";
import Icon from "./Icon";
import Maker from "./Maker";
import Manual from "./Manual";
import Navigation from "./Navigation";
import Joypad from "./Joypad";
import "./index.scss";

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
      <Navigation />
      <Joypad />
    </div>
  );
};

export default App;
