import Game from "../Game";
import Header from "./Header";
import Maker from "./Maker";
import Manual from "./Manual";
import Navigation from "./Navigation";
import Joypad from "./Joypad";
import "./index.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Manual>
          {({ isMaker }) => (
            <Maker isMaker={isMaker}>
              {({ customLevel }) => <Game customLevel={customLevel} />}
            </Maker>
          )}
        </Manual>
      </main>
      <Joypad />
      <Navigation />
    </div>
  );
};

export default App;
