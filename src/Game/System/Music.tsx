import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import MusicHowler from "../Hooks/useMusicHowler";
import {
  lowerVolumeBGM,
  lowerVolumeSFX,
  raiseVolumeBGM,
  raiseVolumeSFX,
  setPlaying,
  toggleRate,
} from "./MusicSlice";
import "./Music.scss";

export enum Volume {
  OFF = 0,
  LOW = 0.1,
  MID = 0.25,
  MAX = 1,
}

export enum Rate {
  SLOWED = 0.5,
  NORMAL = 1,
  DOUBLE = 2,
}

export type Music = {
  bgm: Volume;
  sfx: Volume;
  rate: Rate;
  playing: boolean;
};

type Option = {
  name: string;
  value: Volume;
  onLess?: () => void;
  onMore?: () => void;
};

const Option: React.FC<Option> = ({ name, value, onLess, onMore }) => {
  const display = Volume[value];
  return (
    <div className="Option Music">
      {name}:
      <span className="Clickable" onClick={onLess}>
        {"<"}
      </span>
      <span className="LargerBoldItalic">{display}</span>
      <span className="Clickable" onClick={onMore}>
        {">"}
      </span>
    </div>
  );
};

const Music: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { bgm, sfx, rate, playing } = useSelector(
    (state: RootState) => state.music
  );

  const [swipe, setSwipe] = useState(0);
  const handleSwipe = (s: number) => {
    if (swipe < 9) {
      setSwipe(swipe + s);
      MusicHowler.play("tick");
    } else {
      dispatch(toggleRate());
      setSwipe(0);
    }
  };
  const panel = useMemo(
    () => (
      <div className="Panel">
        <span>{playing ? ";" : ":"}</span>
        <span style={{ transform: `rotate(${swipe * 36}deg)` }}>
          {playing ? "%" : "/"}
        </span>
      </div>
    ),
    [playing, swipe]
  );

  return (
    <>
      <u>SOUNDS</u>
      <div className="Toggles">
        <Option
          name="MUSIC"
          value={bgm}
          onLess={() => dispatch(lowerVolumeBGM())}
          onMore={() => dispatch(raiseVolumeBGM())}
        />
        <Option
          name="SFX"
          value={sfx}
          onLess={() => {
            MusicHowler.play("jump");
            dispatch(lowerVolumeSFX());
          }}
          onMore={() => {
            MusicHowler.play("jump");
            dispatch(raiseVolumeSFX());
          }}
        />
      </div>
      <div
        onClick={() => dispatch(setPlaying(!playing))}
        onWheel={() => handleSwipe(1)}
        onTouchMove={() => handleSwipe(0.25)}
        className={`Gramophone ${playing ? "Playing" : ""} ${Rate[rate]}`}
      >
        {panel}
        {rate !== Rate.NORMAL && (
          <div className="bubble right shadow">{Rate[rate]}</div>
        )}
        <div className="Platform Block" />
      </div>
    </>
  );
};

export default Music;
