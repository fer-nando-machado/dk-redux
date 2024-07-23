import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jumpman } from "./Jumpman";
import { checkBoundaries, checkPlatforms, Position } from "./Position";
import { StoreDispatch, RootState } from "./Store";

const initialState: Jumpman = {
  x: 0,
  y: 0,
  direction: "left",
  player: "M",
};

const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    setJumpman: (state, action: PayloadAction<Jumpman>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPlayer: (state, action: PayloadAction<string>) => {
      state.player = action.payload;
    },
  },
});

export const moveJumpman = createAsyncThunk<
  void,
  Position,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>(
  "JumpmanSlice/moveJumpman",
  async (payload: Position, { getState, dispatch }) => {
    const state: RootState = getState();
    const jumpman = state.jumpman;
    const platforms = state.platformFactory.platforms;

    let { x, y } = payload;
    const moved = {
      x: jumpman.x + x,
      y: jumpman.y + y,
    };
    const bounded = checkBoundaries(moved);
    const plataformed = checkPlatforms(bounded, platforms);
    const direction = x < 0 ? "left" : x > 0 ? "right" : undefined;
    const update: Jumpman = {
      ...jumpman,
      ...plataformed,
      ...(direction ? { direction } : {}),
    };
    dispatch(setJumpman(update));
  }
);

export const { setJumpman, setPlayer } = slice.actions;
export default slice.reducer;