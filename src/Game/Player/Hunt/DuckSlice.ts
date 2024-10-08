import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duck, DuckFactory, MAX_DUCKS } from "./Duck";
import { RootState, StoreDispatch } from "../../reduxStore";
import { flipDirection, LEFT } from "../../Level/Block";
import { checkBoundaries } from "../../Level/Position";

const initialState: DuckFactory = {
  x: 0,
  y: 0,
  onAir: false,
  direction: LEFT,
  ducks: [],
};

const slice = createSlice({
  name: "DuckSlice",
  initialState,
  reducers: {
    setDuckFactory: (_, action: PayloadAction<DuckFactory>) => {
      return action.payload;
    },
    createDuck: (state, action: PayloadAction<Duck>) => {
      if (state.ducks.length == MAX_DUCKS) {
        state.ducks.shift();
      }
      state.ducks.push(action.payload);
    },
    setDuck: (state, action: PayloadAction<Duck>) => {
      const duck = action.payload;
      const index = state.ducks.findIndex((b) => b.id === duck.id);
      if (index === -1) return;
      state.ducks[index] = duck;
    },
    destroyDuck: (state, action: PayloadAction<number>) => {
      state.ducks = state.ducks.filter((b) => b.id !== action.payload);
    },
  },
});

export const moveDuck = createAsyncThunk<
  void,
  Duck,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("DuckSlice/moveDuck", async (payload: Duck, { getState, dispatch }) => {
  const state: RootState = getState();
  const ducks = state.duckFactory.ducks;
  const fps = state.options.lowFPS ? 2 : 1;

  const index = ducks.findIndex((b) => b.id === payload.id);
  if (index === -1) return;
  const duck = ducks[index];

  let { x, y } = payload;
  const moved = {
    ...duck,
    x: duck.x + x * fps,
    y: duck.y + y * fps,
  };
  const bounded = checkBoundaries(moved);
  const direction =
    moved.x !== bounded.x ? flipDirection(duck.direction) : duck.direction;

  const update: Duck = {
    ...duck,
    ...moved,
    ...(direction ? { direction } : {}),
  };
  dispatch(setDuck(update));
});

export const { setDuckFactory, createDuck, setDuck, destroyDuck } =
  slice.actions;
export default slice.reducer;
