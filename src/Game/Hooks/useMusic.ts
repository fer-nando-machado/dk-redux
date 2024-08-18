import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import MusicHowler from "./useMusicHowler";
import {
  changeVolumeBGM,
  changeVolumeSFX,
  setPlaying,
} from "../System/MusicSlice";
import useKeyboard from "./useKeyboard";
import { VOLUME_SHIFT } from "../System/Music";

const useMusic = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { bgm, sfx, playing } = useSelector((state: RootState) => state.music);

  useKeyboard({
    key: ",",
    onKeyDown: () => dispatch(changeVolumeBGM(-VOLUME_SHIFT)),
  });
  useKeyboard({
    key: ".",
    onKeyDown: () => dispatch(changeVolumeBGM(+VOLUME_SHIFT)),
  });
  useKeyboard({
    key: "<",
    onKeyDown: () => dispatch(changeVolumeSFX(-VOLUME_SHIFT)),
  });
  useKeyboard({
    key: ">",
    onKeyDown: () => dispatch(changeVolumeSFX(+VOLUME_SHIFT)),
  });

  useEffect(() => {
    MusicHowler.load("theme", {
      src: ["theme.mp3"],
      volume: bgm / 100,
      loop: true,
    });
    MusicHowler.load("jump", {
      src: ["jump.mp3"],
      volume: sfx / 100,
      rate: 1,
    });

    dispatch(setPlaying(true));

    return () => {
      MusicHowler.stop("theme");
      // MusicHowler.unload("theme");
      // MusicHowler.unload("jump");
    };
  }, []);

  useEffect(() => {
    if (playing) {
      MusicHowler.play("theme");
    } else {
      MusicHowler.pause("theme");
    }
  }, [playing]);

  useEffect(() => {
    MusicHowler.setVolume("theme", playing ? bgm / 100 : 0);
  }, [bgm, playing]);

  useEffect(() => {
    MusicHowler.setVolume("jump", playing ? sfx / 100 : 0);
  }, [sfx, playing]);
};

export default useMusic;
