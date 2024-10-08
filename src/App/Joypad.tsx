import React, { useEffect, useState } from "react";
import { dispatchKeyUp, dispatchKeyDown } from "../Game/Hooks/useKeyboard";
import "./Joypad.scss";

const KEYS = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  start: "Enter",
  space: " ",
  blank: "",
};

const Joypad: React.FC = () => {
  const [port, setPort] = useState<number>(0);

  const disconnectJoypad = () => {
    setPort(0);
  };

  const connectJoypad = () => {
    if (port === 0) {
      setPort(1);
    }
  };

  const switchCable = () => {
    if (port !== 0) {
      disconnectJoypad();
    } else {
      connectJoypad();
    }
  };

  const switchPort = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (port === 1) {
      setPort(2);
    } else if (port === 2) {
      setPort(1);
    }
  };

  useEffect(() => {
    window.addEventListener("controller:inserted", connectJoypad);
    window.addEventListener("controller:removed", disconnectJoypad);

    return () => {
      window.removeEventListener("controller:inserted", connectJoypad);
      window.removeEventListener("controller:removed", disconnectJoypad);
    };
  }, []);

  return (
    <div onClick={connectJoypad} className={`Joypad P${port}`}>
      <div className="Cable" onClick={switchCable}>
        <span className="Port" onClick={switchPort} />
      </div>
      {port === 1 ? <P1 /> : port === 2 ? <P2 /> : null}
    </div>
  );
};

const P1: React.FC = () => {
  const [pressedKey, setPressedKey] = useState<string | undefined>();

  const handleButtonStart = (key: string, isHoldable?: boolean) => () => {
    if (isHoldable) {
      setPressedKey(key);
    }
    dispatchKeyDown(key);
  };

  const handleButtonEnd = (key: string, isHoldable?: boolean) => () => {
    if (isHoldable) {
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

    const touchedKey = touchedElement?.getAttribute("data-key");
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
    window.addEventListener("level:reset", releasePressedKey);
    return () => {
      window.removeEventListener("level:reset", releasePressedKey);
    };
  }, []);

  return (
    <>
      <div className="dpad">
        {renderDirection(KEYS.left, "left", "◁")}
        {renderDirection(KEYS.up, "up", "△")}
        {renderDirection(KEYS.blank, "center", "◯")}
        {renderDirection(KEYS.down, "down", "▽")}
        {renderDirection(KEYS.right, "right", "▷")}
      </div>
      <span className="option start" onClick={handleButtonStart(KEYS.start)} />
      <span
        className="option action"
        onTouchStart={handleButtonStart(KEYS.space)}
        onClick={handleButtonStart(KEYS.space)}
      />
    </>
  );
};

const P2: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.toUpperCase().trim());
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
