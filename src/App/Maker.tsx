import React, { useEffect, useState } from "react";
import { CustomLevel } from "../Game/Level";
import "./Maker.scss";

type Maker = {
  isMaker: boolean;
  children: (props: { customLevel: CustomLevel }) => React.ReactNode;
};

const demoLevel = `{
  "platforms": [
    { "x": 0, "y": 700, "length": 100 },
    { "x": 25, "y": 625, "length": 25 },
    { "x": 100, "y": 525, "length": 175 },
    { "x": 400, "y": 425, "length": 75 },
    { "x": 0, "y": 325, "length": 425 },
    { "x": 325, "y": 225, "length": 150 },
    { "x": 125, "y": 125, "length": 200 },
    { "x": 25, "y": 25, "length": 450 }
  ],
  "ladders": [
    { "x": 200, "y": 25, "height": 100 }
  ],
  "barrelFactory": {
    "x": 25,
    "y": 650
  },
  "fireFactory": {
    "x": 400,
    "y": 250
  },
  "jumpman": {
    "x": 100,
    "y": 70
  }
}
`;

const parseCustomLevel = (string: string) => {
  const customLevel: CustomLevel = JSON.parse(string);
  return customLevel;
};

const Maker: React.FC<Maker> = ({ isMaker, children }) => {
  const [input, setInput] = useState<string>(demoLevel);
  const [error, setError] = useState<string>();
  const [level, setLevel] = useState<CustomLevel>();

  useEffect(() => {
    if (isMaker) {
      setLevel(parseCustomLevel(input));
    } else {
      setLevel(undefined);
    }
  }, [isMaker]);

  const handleReset = () => {
    if (!isMaker) return;
    setInput(demoLevel);
    setLevel(parseCustomLevel(demoLevel));
    setError(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isMaker) return;
    try {
      setInput(e.target.value);
      const customLevel: CustomLevel = parseCustomLevel(e.target.value);
      setLevel(customLevel);
      setError(undefined);
    } catch (e: any) {
      setError(e.toString());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {isMaker && (
        <div className="Manual Maker">
          <u>HOW TO MAKE</u>
          <div>
            <p>
              <span className="Jumpman Block M" />
              {"jumpman:{}"}
            </p>
            <p>
              <span className="Barrel Block Round" />
              {"barrelFactory:{}"}
            </p>
            <p>
              <span className="Drum Block" />
              {"fireFactory:{}"}
            </p>
            <p>
              <span className="Platform Block" />
              {"platforms:[{}]"}
            </p>
            <p>
              <span className="Ladder Block" />
              {"ladders:[{}]"}
            </p>
          </div>
          {"{ x, y, … }"}
        </div>
      )}
      {children({ customLevel: { ...level } })}
      {isMaker && (
        <div className="Manual Maker">
          <u>LEVEL MAKER</u>
          <div className={`Control ${error ? "Error" : ""}`}>
            <button className="Switch" onClick={handleReset}>
              RESET
            </button>
          </div>
          <textarea
            value={input}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onKeyUp={handleKeyPress}
            className={error ? "Error" : ""}
          />
          <div className="Console" title={error}>
            {error}
          </div>
        </div>
      )}
    </>
  );
};

export default Maker;
