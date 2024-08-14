import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "./Options";
import { Player } from "./PlayerSelect";
import { RootState, StoreDispatch } from "../reduxStore";
import { showMessage } from "./StatusSlice";

const initialState: Options = {
  //TODO move Player to own slice
  player: { code: "M" },
  playerSelect: {},
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
    setPlayer: (state, action: PayloadAction<string>) => {
      const code = action.payload;
      if (!state.playerSelect[code]) {
        state.playerSelect[code] = { code };
      }
      state.player = state.playerSelect[code];
    },
    winPlayer: (state) => {
      const update: Player = {
        ...state.player,
        complete: true,
        highScore: Math.floor(10000 + Math.random() * 90000),
        speedRun: Math.floor(100 + Math.random() * 900),
      };
      state.player = update;
      state.playerSelect[update.code] = update;
    },
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
        player: state.player,
        playerSelect: state.playerSelect,
      };
    },
    setMaker: (state, action: PayloadAction<boolean>) => {
      const isMaker = action.payload;
      return {
        ...initialState,
        lowFPS: state.lowFPS,
        filters: state.filters,
        player: state.player,
        playerSelect: state.playerSelect,
        debug: isMaker,
        maker: isMaker,
      };
    },
    enableDebug: (state) => {
      state.debug = true;
    },
  },
});

export const setPlayer = createAsyncThunk<
  void,
  String,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("OptionsSlice/setPlayer", async (payload: String, { getState, dispatch }) => {
  const { options }: RootState = getState();
  const code = payload.toString();

  if (!options.playerSelect[code]) {
    dispatch(showMessage("PLAYER UNLOCKED: " + code));
  }
  dispatch(slice.actions.setPlayer(code));
});

export const {
  resetOptions,
  setPaused,
  winPlayer,
  togglePaused,
  toggleLowFPS,
  toggleFilters,
  toggleGravity,
  setMaker,
  enableDebug,
} = slice.actions;
export default slice.reducer;
