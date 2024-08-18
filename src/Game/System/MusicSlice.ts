import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music, Volume } from "./Music";

const initialState: Music = {
  bgm: Volume.MID,
  sfx: Volume.LOW,
  playing: false,
};

const slice = createSlice({
  name: "MusicSlice",
  initialState,
  reducers: {
    raiseVolumeBGM: (state) => {
      state.bgm = raiseVolume(state.bgm);
    },
    lowerVolumeBGM: (state) => {
      state.bgm = lowerVolume(state.bgm);
    },
    raiseVolumeSFX: (state) => {
      state.sfx = raiseVolume(state.sfx);
    },
    lowerVolumeSFX: (state) => {
      state.sfx = lowerVolume(state.sfx);
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },
});

const raiseVolume = (volume: Volume): Volume => {
  switch (volume) {
    case Volume.OFF:
      return Volume.LOW;
    case Volume.LOW:
      return Volume.MID;
    case Volume.MID:
      return Volume.MAX;
    case Volume.MAX:
    default:
      return Volume.MAX;
  }
};

const lowerVolume = (volume: Volume): Volume => {
  switch (volume) {
    case Volume.MAX:
      return Volume.MID;
    case Volume.MID:
      return Volume.LOW;
    case Volume.LOW:
      return Volume.OFF;
    case Volume.OFF:
    default:
      return Volume.OFF;
  }
};

export const {
  raiseVolumeBGM,
  lowerVolumeBGM,
  raiseVolumeSFX,
  lowerVolumeSFX,
  setPlaying,
} = slice.actions;
export default slice.reducer;
