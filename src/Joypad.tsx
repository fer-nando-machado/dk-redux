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
    dispatchKeyDown(key);
    //  setTimeout(() => {
    //    dispatchKeyUp(keyMap.space);
    //  }, 100);
  };

  useEffect(() => {
    const showJoypad = () => {
      setHidden(false);
    };

    const hideJoypad = () => {
      setHidden(true);
    };

    window.addEventListener("controller:inserted", showJoypad);
    window.addEventListener("controller:removed", hideJoypad);

    return () => {
      window.removeEventListener("controller:inserted", showJoypad);
      window.removeEventListener("controller:removed", hideJoypad);
    };
  }, []);

  return (
    <div className={`Joypad ${hidden ? "hidden" : ""}`}>
      <div className="dpad">
        <button
          onClick={() => handleDirectionClick("left")}
          className={`left ${direction === "left" ? "active" : ""}`}
        >
          ◁
        </button>
        <button
          onClick={() => handleDirectionClick("up")}
          className={`up ${direction === "up" ? "active" : ""}`}
        >
          △
        </button>
        <span onClick={() => handleDirectionReset()}></span>
        <button
          onClick={() => handleDirectionClick("down")}
          className={`down ${direction === "down" ? "active" : ""}`}
        >
          ▽
        </button>
        <button
          onClick={() => handleDirectionClick("right")}
          className={`right ${direction === "right" ? "active" : ""}`}
        >
          ▷
        </button>
      </div>
      <button className="start" onClick={() => handleButtonClick(keys.start)} />
      <button
        className="action"
        onClick={() => handleButtonClick(keys.space)}
      />
    </div>
  );
};

export default Joypad;
