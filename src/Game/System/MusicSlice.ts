import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "./Music";

const initialState: Music = {
  bgm: 50,
  sfx: 20,
  playing: false,
};

const slice = createSlice({
  name: "MusicSlice",
  initialState,
  reducers: {
    changeVolumeBGM: (state, action: PayloadAction<number>) => {
      state.bgm = Math.max(0, Math.min(100, state.bgm + action.payload));
    },
    changeVolumeSFX: (state, action: PayloadAction<number>) => {
      state.sfx = Math.max(0, Math.min(100, state.sfx + action.payload));
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },
});

export const { changeVolumeBGM, changeVolumeSFX, setPlaying } = slice.actions;
export default slice.reducer;
