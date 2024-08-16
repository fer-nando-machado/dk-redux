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
  const [port, setPort] = useState<number>(1);
  const [pressedKey, setPressedKey] = useState<string | undefined>();

  const showJoypad = () => {
    setHidden(false);
  };

  const hideJoypad = () => {
    setHidden(true);
  };

  const connectJoypad = () => {
    if (port === 0) {
      setPort(1);
    }
  };

  const switchPort = () => {
    if (port === 1) {
      setPort(2);
    } else if (port === 2) {
      setPort(0);
    }
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
      onClick={connectJoypad}
      className={`Joypad P${port} ${hidden ? "hidden" : ""}`}
    >
      <div className="Joycable" onClick={switchPort} />
      {port === 1 && (
        <>
          <div className="dpad">
            {renderDirection(keys.left, "left", "◁")}
            {renderDirection(keys.up, "up", "△")}
            {renderDirection("", "center", "◯")}
            {renderDirection(keys.down, "down", "▽")}
            {renderDirection(keys.right, "right", "▷")}
          </div>
          <span
            className="option start"
            onClick={handleButtonStart(keys.start)}
          />
          <span
            className="option action"
            onTouchStart={handleButtonStart(keys.space)}
            onClick={handleButtonStart(keys.space)}
          />
        </>
      )}
      {port === 2 && <P2 />}
    </div>
  );
};

const P2: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchKeyDown(code);
    setCode("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={code}
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyPress}
        onChange={handleChange}
      />
      <button type="submit" className="option action" />
    </form>
  );
};

export default Joypad;
