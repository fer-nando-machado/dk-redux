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

type Direction = "up" | "down" | "left" | "right";

const Joypad: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  const [stored, setStored] = useState(false);

  const [direction, setDirection] = useState<Direction>();

  const handleDirectionReset = () => {
    if (direction) {
      dispatchKeyUp(keys[direction]);
    }
    setDirection(undefined);
  };

  const handleDirectionClick = (eventDirection: Direction) => {
    if (eventDirection === direction) {
      handleDirectionReset();
      return;
    }

    if (direction) {
      dispatchKeyUp(keys[direction]);
    }
    dispatchKeyDown(keys[eventDirection]);
    setDirection(eventDirection);
  };

  const handleButtonClick = (key: string) => {
    if (key === keys.start) {
      handleDirectionReset();
    }

    dispatchKeyDown(key);
    //  setTimeout(() => {
    //    dispatchKeyUp(keyMap.space);
    //  }, 100);
  };

  const takeJoypad = () => {
    if (stored) {
      setStored(false);
    }
  };

  const storeJoypad = () => {
    if (!stored) {
      setStored(true);
      handleDirectionReset();
    }
  };

  const showJoypad = () => {
    setHidden(false);
  };

  const hideJoypad = () => {
    setHidden(true);
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
      <div className="Joycable" onClick={storeJoypad}></div>
      <div className="dpad">
        <button
          tabIndex={-1}
          onClick={() => handleDirectionClick("left")}
          className={`left ${direction === "left" ? "active" : ""}`}
        >
          ◁
        </button>
        <button
          tabIndex={-1}
          onClick={() => handleDirectionClick("up")}
          className={`up ${direction === "up" ? "active" : ""}`}
        >
          △
        </button>
        <button
          tabIndex={-1}
          className="center"
          onClick={() => handleDirectionReset()}
        >
          ◯
        </button>
        <button
          tabIndex={-1}
          onClick={() => handleDirectionClick("down")}
          className={`down ${direction === "down" ? "active" : ""}`}
        >
          ▽
        </button>
        <button
          tabIndex={-1}
          onClick={() => handleDirectionClick("right")}
          className={`right ${direction === "right" ? "active" : ""}`}
        >
          ▷
        </button>
      </div>
      <button
        tabIndex={-1}
        className="option start"
        onClick={() => handleButtonClick(keys.start)}
      />
      <button
        tabIndex={-1}
        className="option action"
        onClick={() => handleButtonClick(keys.space)}
      />
    </div>
  );
};

export default Joypad;
