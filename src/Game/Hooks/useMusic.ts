import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../reduxStore";
import useKeyboard from "./useKeyboard";
import MusicHowler from "../../Library/Howler";
import { Rate } from "../System/Music";
import { ROSTER } from "../System/Roster";
import {
  lowerVolumeBGM,
  lowerVolumeSFX,
  raiseVolumeBGM,
  raiseVolumeSFX,
  setPlaying,
  toggleRate,
} from "../System/MusicSlice";

const useMusic = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.roster);
  const { reached } = useSelector((state: RootState) => state.goal);
  const { bgm, sfx, playing, rate } = useSelector(
    (state: RootState) => state.music
  );

  const song = useMemo(() => {
    return reached ? Song.Konga : ROSTER[current]?.theme || Song.Remix;
  }, [reached, current]);

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
    key: ":",
    onKeyDown: () => dispatch(setPlaying(false)),
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
    MusicHowler.load("jump", {
      src: [Effect.Jump],
      volume: sfx,
    });
    MusicHowler.load("tick", {
      src: [Effect.Tick],
      volume: sfx,
    });
    MusicHowler.load("flap", {
      src: [Effect.Flap],
      volume: sfx,
    });
    MusicHowler.load("fall", {
      src: [Effect.Fall],
      volume: sfx,
    });
    MusicHowler.load("shot", {
      src: [Effect.Shot],
      volume: sfx,
    });
    return () => {
      MusicHowler.unload("shot");
      MusicHowler.unload("fall");
      MusicHowler.unload("flap");
      MusicHowler.unload("jump");
      MusicHowler.unload("tick");
    };
  }, []);

  useEffect(() => {
    MusicHowler.load("theme", {
      src: [song],
      volume: bgm,
      loop: true,
      rate: song === Song.Konga ? Rate.DOUBLE : rate,
      autoplay: playing,
    });
    return () => {
      MusicHowler.stop("theme");
      MusicHowler.unload("theme");
    };
  }, [song]);

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
    MusicHowler.setVolume("shot", playing ? sfx : 0);
    MusicHowler.setVolume("fall", playing ? sfx : 0);
    MusicHowler.setVolume("flap", playing ? sfx : 0);
    MusicHowler.setVolume("jump", playing ? sfx : 0);
    MusicHowler.setVolume("tick", playing ? sfx : 0);
  }, [sfx, playing]);

  useEffect(() => {
    MusicHowler.setRate("theme", rate);
  }, [rate]);
};

export enum Song {
  LB99 = "assets/music/99.m4a",
  Hunter = "assets/music/hunter.mp4",
  Konga = "assets/music/konga.m4a",
  Remix = "assets/music/remix.m4a",
  Bop = "assets/music/she.m4a",
  Lucky = "assets/music/star.m4a",
  Theme = "assets/music/theme.mp3",
}

enum Effect {
  Jump = "assets/sfx/jump.mp3",
  Tick = "assets/sfx/tick.mp3",
  Flap = "assets/sfx/flap.mp3",
  Fall = "assets/sfx/fall.mp3",
  Shot = "assets/sfx/shot.mp3",
}

export default useMusic;
