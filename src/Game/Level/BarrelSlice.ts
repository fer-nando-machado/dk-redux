import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Barrel, BarrelFactory, MAX_BARRELS } from "./Barrel";
import { checkBoundaries, checkPlatforms } from "./Position";
import { RootState, StoreDispatch } from "../reduxStore";
import { flipDirection, LEFT } from "./Block";

const initialState: BarrelFactory = {
  x: 0,
  y: 0,
  isJumping: false,
  direction: LEFT,
  barrels: [],
};

const slice = createSlice({
  name: "BarrelSlice",
  initialState,
  reducers: {
    setBarrelFactory: (_, action: PayloadAction<BarrelFactory>) => {
      return action.payload;
    },
    createBarrel: (state, action: PayloadAction<Barrel>) => {
      if (state.barrels.length == MAX_BARRELS) {
        state.barrels.shift();
      }
      state.barrels.push(action.payload);
    },
    setBarrel: (state, action: PayloadAction<Barrel>) => {
      const barrel = action.payload;
      const index = state.barrels.findIndex((b) => b.id === barrel.id);
      if (index === -1) return;
      state.barrels[index] = barrel;
    },
    destroyBarrel: (state, action: PayloadAction<number>) => {
      state.barrels = state.barrels.filter((b) => b.id !== action.payload);
    },
  },
});

export const moveBarrel = createAsyncThunk<
  void,
  Barrel,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("BarrelSlice/moveBarrel", async (payload: Barrel, { getState, dispatch }) => {
  const state: RootState = getState();
  const platforms = state.platformFactory.platforms;
  const barrels = state.barrelFactory.barrels;

  const index = barrels.findIndex((b) => b.id === payload.id);
  if (index === -1) return;
  const barrel = barrels[index];

  let { x, y } = payload;
  const moved = {
    ...barrel,
    x: barrel.x + x,
    y: barrel.y + y,
  };
  const bounded = checkBoundaries(moved);
  const plataformed = checkPlatforms(bounded, platforms);
  const dropped = barrel.isJumping && !plataformed.isJumping;
  const direction = dropped
    ? flipDirection(barrel.direction)
    : barrel.direction;
  const update: Barrel = {
    ...barrel,
    ...plataformed,
    direction,
  };
  dispatch(setBarrel(update));
});

export const { setBarrelFactory, createBarrel, setBarrel, destroyBarrel } =
  slice.actions;
export default slice.reducer;
