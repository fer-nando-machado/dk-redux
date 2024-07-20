import "./App.scss";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <h1>DK</h1>
      <Game />
      <a href="https://github.com/fer-nando-machado/react-dk">
        <img src={GitHub} alt="GitHub" height={25} />
      </a>
    </div>
  );
}

export default App;
