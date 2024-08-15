import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "./Options";

const initialState: Options = {
  paused: false,
  lowFPS: false,
  filters: true,
  gravity: true,
  maker: false,
  debug: false,
};

const slice = createSlice({
  name: "OptionsSlice",
  initialState,
  reducers: {
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    togglePaused: (state) => {
      state.paused = !state.paused;
    },
    toggleLowFPS: (state) => {
      state.lowFPS = !state.lowFPS;
    },
    toggleFilters: (state) => {
      state.filters = !state.filters;
    },
    toggleGravity: (state) => {
      state.gravity = !state.gravity;
      state.debug = true;
    },
    resetOptions: (state) => {
      return {
        ...initialState,
        lowFPS: state.lowFPS,
        filters: state.filters,
      };
    },
    setMaker: (state, action: PayloadAction<boolean>) => {
      const isMaker = action.payload;
      return {
        ...initialState,
        lowFPS: state.lowFPS,
        filters: state.filters,
        debug: isMaker,
        maker: isMaker,
      };
    },
    enableDebug: (state) => {
      state.debug = true;
    },
  },
});

export const {
  resetOptions,
  setPaused,
  togglePaused,
  toggleLowFPS,
  toggleFilters,
  toggleGravity,
  setMaker,
  enableDebug,
} = slice.actions;
export default slice.reducer;
