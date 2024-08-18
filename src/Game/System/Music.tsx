import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import MusicHowler from "../Hooks/useMusicHowler";
import {
  lowerVolumeBGM,
  lowerVolumeSFX,
  raiseVolumeBGM,
  raiseVolumeSFX,
  setPlaying,
} from "./MusicSlice";
import "./Music.scss";

export enum Volume {
  OFF = 0,
  LOW = 0.1,
  MID = 0.5,
  MAX = 1,
}

export type Music = {
  bgm: number;
  sfx: number;
  playing: boolean;
};

type Option = {
  name: string;
  value: number;
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
  const music = useSelector((state: RootState) => state.music);

  return (
    <>
      <u>SOUNDS</u>
      <div className="Toggles">
        <Option
          name="MUSIC"
          value={music.bgm}
          onLess={() => dispatch(lowerVolumeBGM())}
          onMore={() => dispatch(raiseVolumeBGM())}
        />
        <Option
          name="SFX"
          value={music.sfx}
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
        onClick={() => dispatch(setPlaying(!music.playing))}
        className={`Gramophone ${music.playing ? "Playing" : ""}`}
      >
        {music.playing ? ";%" : ";/"}
        <div className="Platform Block" />
      </div>
    </>
  );
};

export default Music;
