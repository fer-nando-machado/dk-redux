import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import MusicHowler from "./useMusicHowler";
import {
  lowerVolumeBGM,
  lowerVolumeSFX,
  raiseVolumeBGM,
  raiseVolumeSFX,
  setPlaying,
  toggleRate,
} from "../System/MusicSlice";
import useKeyboard from "./useKeyboard";

const useMusic = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { bgm, sfx, playing, rate } = useSelector(
    (state: RootState) => state.music
  );

  useKeyboard({
    key: ",",
    onKeyDown: () => dispatch(lowerVolumeBGM()),
  });
  useKeyboard({
    key: ".",
    onKeyDown: () => dispatch(raiseVolumeBGM()),
  });
  useKeyboard({
    key: "<",
    onKeyDown: () => dispatch(lowerVolumeSFX()),
  });
  useKeyboard({
    key: ">",
    onKeyDown: () => dispatch(raiseVolumeSFX()),
  });
  useKeyboard({
    key: ";",
    onKeyDown: () => dispatch(setPlaying(!playing)),
  });
  useKeyboard({
    key: "%",
    onKeyDown: () => dispatch(toggleRate()),
  });

  useEffect(() => {
    MusicHowler.load("theme", {
      src: ["theme.mp3"],
      volume: bgm,
      loop: true,
    });
    MusicHowler.load("jump", {
      src: ["jump.mp3"],
      volume: sfx,
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
    MusicHowler.setVolume("theme", playing ? bgm : 0);
  }, [bgm, playing]);

  useEffect(() => {
    MusicHowler.setVolume("jump", playing ? sfx : 0);
  }, [sfx, playing]);

  useEffect(() => {
    MusicHowler.setRate("theme", rate);
  }, [rate]);
};

export default useMusic;
