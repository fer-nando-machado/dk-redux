import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import Howler from "../../Library/Howler";
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
    Howler.load("theme", {
      src: ["theme.mp3"],
      volume: bgm,
      loop: true,
    });
    Howler.load("jump", {
      src: ["jump.mp3"],
      volume: sfx,
    });
    Howler.load("tick", {
      src: ["tick.mp3"],
      volume: sfx,
    });

    dispatch(setPlaying(true));

    return () => {
      Howler.stop("theme");
      // MusicHowler.unload("theme");
      // MusicHowler.unload("jump");
    };
  }, []);

  useEffect(() => {
    if (playing) {
      Howler.play("theme");
    } else {
      Howler.pause("theme");
    }
  }, [playing]);

  useEffect(() => {
    Howler.setVolume("theme", playing ? bgm : 0);
  }, [bgm, playing]);

  useEffect(() => {
    Howler.setVolume("jump", playing ? sfx : 0);
    Howler.setVolume("tick", playing ? sfx : 0);
  }, [sfx, playing]);

  useEffect(() => {
    Howler.setRate("theme", rate);
  }, [rate]);
};

export default useMusic;
