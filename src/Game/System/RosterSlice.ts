import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Player, Roster } from "./Roster";
import { RootState, StoreDispatch } from "../reduxStore";
import { showMessage } from "./StatusSlice";
import { getLadyOrRandomPartner } from "../Player/Lady";
import { setReached } from "../Level/GoalSlice";

const initialState: Roster = {
  current: "",
  players: {},
};

const slice = createSlice({
  name: "RosterSlice",
  initialState,
  reducers: {
    unlockPlayer(state, action: PayloadAction<Player>) {
      state.players[action.payload.code] = action.payload;
    },
    setCurrent(state, action: PayloadAction<string>) {
      state.current = action.payload;
    },
    winPlayerCheat: (state, action: PayloadAction<Player>) => {
      const { players } = state;
      const { code } = action.payload;
      const update: Player = {
        ...players[code],
        ...action.payload,
        complete: true,
      };
      state.players[code] = update;
    },
  },
});

export const winPlayer = createAsyncThunk<
  void,
  Player,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("RosterSlice/winPlayer", async (payload: Player, { getState, dispatch }) => {
  const { roster }: RootState = getState();
  const player = payload;

  dispatch(setReached());
  dispatch(slice.actions.winPlayerCheat(player));

  setTimeout(() => {
    dispatch(setPlayer(getLadyOrRandomPartner(roster)));
  }, 13000);
});

export const setPlayer = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("RosterSlice/setPlayer", async (payload: string, { getState, dispatch }) => {
  const { roster }: RootState = getState();
  const code = payload.toString();

  if (!roster.players[code]) {
    dispatch(showMessage("PLAYER UNLOCKED: " + code));
    dispatch(slice.actions.unlockPlayer({ code }));
  }
  dispatch(slice.actions.setCurrent(code));
  window.dispatchEvent(new CustomEvent("level:reset"));
});

export const setStarters = createAsyncThunk<
  void,
  string[],
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("RosterSlice/setStarters", async (payload: string[], { dispatch }) => {
  payload.forEach((code) => {
    dispatch(slice.actions.unlockPlayer({ code }));
  });
  dispatch(slice.actions.setCurrent(payload[payload.length - 1]));
});

export const { winPlayerCheat } = slice.actions;
export default slice.reducer;
