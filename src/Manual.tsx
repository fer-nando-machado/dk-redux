import { useState } from "react";
import "./Manual.scss";

type Manual = {
  children: (props: { isMaker: boolean }) => React.ReactNode;
};

const Manual: React.FC<Manual> = ({ children }) => {
  const [isMaker, setMaker] = useState(false);

  return (
    <>
      <button className="Switch" onClick={() => setMaker(!isMaker)}>
        {isMaker ? "EXIT" : "MAKER"}
      </button>
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
              Reset: F4
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
      {children({ isMaker })}
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
    </>
  );
};

export default Manual;
