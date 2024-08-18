import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music, Rate, Volume } from "./Music";

const initialState: Music = {
  bgm: Volume.MID,
  sfx: Volume.LOW,
  rate: Rate.NORMAL,
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
    toggleRate: (state) => {
      state.rate = switchRate(state.rate);
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
      return Volume.OFF;
  }
};

const switchRate = (rate: Rate): Rate => {
  switch (rate) {
    case Rate.SLOWED:
      return Rate.NORMAL;
    case Rate.NORMAL:
      return Rate.DOUBLE;
    case Rate.DOUBLE:
      return Rate.SLOWED;
  }
};

export const {
  raiseVolumeBGM,
  lowerVolumeBGM,
  raiseVolumeSFX,
  lowerVolumeSFX,
  toggleRate,
  setPlaying,
} = slice.actions;
export default slice.reducer;
