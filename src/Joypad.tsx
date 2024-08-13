import React, { useEffect, useState } from "react";
import { dispatchKeyUp, dispatchKeyDown } from "./Game/Hooks/useKeyboard";
import "./Joypad.scss";

const keys = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  space: " ",
  start: "Enter",
};

const Joypad: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [stored, setStored] = useState<boolean>(false);

  const takeJoypad = () => {
    if (stored) {
      setStored(false);
    }
  };

  const storeJoypad = () => {
    if (!stored) {
      setStored(true);
    }
  };

  const showJoypad = () => {
    setHidden(false);
  };

  const hideJoypad = () => {
    setHidden(true);
  };

  const handleButtonStart = (key: string) => () => {
    dispatchKeyDown(key);
  };

  const handleButtonEnd = (key: string) => () => {
    dispatchKeyUp(key);
  };

  useEffect(() => {
    window.addEventListener("controller:inserted", showJoypad);
    window.addEventListener("controller:removed", hideJoypad);

    return () => {
      window.removeEventListener("controller:inserted", showJoypad);
      window.removeEventListener("controller:removed", hideJoypad);
    };
  }, []);

  return (
    <div
      onClick={takeJoypad}
      className={`Joypad ${hidden ? "hidden" : ""} ${stored ? "stored" : ""}`}
    >
      <div className="Joycable" onClick={storeJoypad} />
      <div className="dpad">
        <span
          className="left"
          onTouchStart={handleButtonStart(keys.left)}
          onMouseDown={handleButtonStart(keys.left)}
          onTouchEnd={handleButtonEnd(keys.left)}
          onMouseUp={handleButtonEnd(keys.left)}
          onMouseLeave={handleButtonEnd(keys.left)}
        >
          ◁
        </span>
        <span
          className="up"
          onTouchStart={handleButtonStart(keys.up)}
          onMouseDown={handleButtonStart(keys.up)}
          onTouchEnd={handleButtonEnd(keys.up)}
          onMouseUp={handleButtonEnd(keys.up)}
          onMouseLeave={handleButtonEnd(keys.up)}
        >
          △
        </span>
        <span className="center">◯</span>
        <span
          className="down"
          onTouchStart={handleButtonStart(keys.down)}
          onMouseDown={handleButtonStart(keys.down)}
          onTouchEnd={handleButtonEnd(keys.down)}
          onMouseUp={handleButtonEnd(keys.down)}
          onMouseLeave={handleButtonEnd(keys.down)}
        >
          ▽
        </span>
        <span
          className="right"
          onTouchStart={handleButtonStart(keys.right)}
          onMouseDown={handleButtonStart(keys.right)}
          onTouchEnd={handleButtonEnd(keys.right)}
          onMouseUp={handleButtonEnd(keys.right)}
          onMouseLeave={handleButtonEnd(keys.right)}
        >
          ▷
        </span>
      </div>
      <span className="option start" onClick={handleButtonStart(keys.start)} />
      <span
        className="option action"
        onTouchStart={handleButtonStart(keys.space)}
        onClick={handleButtonStart(keys.space)}
      />
    </div>
  );
};

export default Joypad;
