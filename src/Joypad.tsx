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
  const [pressedKey, setPressedKey] = useState<string | undefined>();

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

  const handleButtonStart = (key: string, direction?: boolean) => () => {
    if (direction) {
      setPressedKey(key);
    }
    dispatchKeyDown(key);
  };

  const handleButtonEnd = (key: string, direction?: boolean) => () => {
    if (direction) {
      releasePressedKey();
    }
    dispatchKeyUp(key);
  };

  const releasePressedKey = () => {
    setPressedKey(undefined);
  };

  const handleTouchMove = (currentKey: string) => (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const touchedElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    ) as HTMLElement;
    if (!touchedElement) return;

    const touchedKey = touchedElement.getAttribute("data-key");
    if (touchedKey !== currentKey) {
      handleButtonEnd(currentKey, true)();
    }
    if (touchedKey) {
      handleButtonStart(touchedKey, true)();
    }
  };

  const renderDirection = (key: string, className: string, label: string) => (
    <span
      data-key={key}
      onTouchStart={handleButtonStart(key, true)}
      onTouchMove={handleTouchMove(key)}
      onTouchEnd={handleButtonEnd(key, true)}
      onMouseDown={handleButtonStart(key, true)}
      onMouseLeave={handleButtonEnd(key, true)}
      onMouseUp={handleButtonEnd(key, true)}
      className={`${className} ${key === pressedKey ? "pressed" : ""}`}
    >
      {label}
    </span>
  );

  useEffect(() => {
    window.addEventListener("controller:inserted", showJoypad);
    window.addEventListener("controller:removed", hideJoypad);
    window.addEventListener("level:reset", releasePressedKey);

    return () => {
      window.removeEventListener("controller:inserted", showJoypad);
      window.removeEventListener("controller:removed", hideJoypad);
      window.removeEventListener("level:reset", releasePressedKey);
    };
  }, []);

  return (
    <div
      onClick={takeJoypad}
      className={`Joypad ${hidden ? "hidden" : ""} ${stored ? "stored" : ""}`}
    >
      <div className="Joycable" onClick={storeJoypad} />
      <div className="dpad">
        {renderDirection(keys.left, "left", "◁")}
        {renderDirection(keys.up, "up", "△")}
        {renderDirection("", "center", "◯")}
        {renderDirection(keys.down, "down", "▽")}
        {renderDirection(keys.right, "right", "▷")}
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
