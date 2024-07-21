import "./App.scss";
import GitHub from "/GitHub.svg?url";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <b>DK Redux</b>
      <Game />
      <a href="https://github.com/fer-nando-machado/dk-redux">
        <img src={GitHub} alt="GitHub" height={25} />
      </a>
    </div>
  );
}

export default App;
