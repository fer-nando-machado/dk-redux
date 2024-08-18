import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import MusicHowler from "../Hooks/useMusicHowler";
import { changeVolumeBGM, changeVolumeSFX, setPlaying } from "./MusicSlice";
import "./Music.scss";

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

export const VOLUME_SHIFT = 10;

const Option: React.FC<Option> = ({ name, value, onLess, onMore }) => {
  const display = Math.round(value).toString().padStart(3, "0");
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
          onLess={() => dispatch(changeVolumeBGM(-VOLUME_SHIFT))}
          onMore={() => dispatch(changeVolumeBGM(+VOLUME_SHIFT))}
        />
        <Option
          name="EFFECTS"
          value={music.sfx}
          onLess={() => {
            MusicHowler.play("jump");
            dispatch(changeVolumeSFX(-VOLUME_SHIFT));
          }}
          onMore={() => {
            MusicHowler.play("jump");
            dispatch(changeVolumeSFX(+VOLUME_SHIFT));
          }}
        />
      </div>
      <div
        onClick={() => dispatch(setPlaying(!music.playing))}
        className={`Gramophone ${music.playing ? "Playing" : ""}`}
      >
        {music.playing ? "_%" : "//"}
        <div className="Block Platform" />
      </div>
    </>
  );
};

export default Music;
