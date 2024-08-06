import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Barrel, BarrelFactory, MAX_BARRELS } from "./Barrel";
import { checkBoundaries, checkLadders, checkPlatforms } from "./Position";
import { RootState, StoreDispatch } from "../reduxStore";
import { flipDirection, isDirectionLeft, LEFT } from "./Block";
import { getRandomLadderIds } from "./Ladder";

const initialState: BarrelFactory = {
  x: 0,
  y: 0,
  onAir: false,
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
  Number,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("BarrelSlice/moveBarrel", async (payload: Number, { getState, dispatch }) => {
  const state: RootState = getState();
  const fps = state.options.lowFPS ? 2 : 1;
  const gravity = state.options.gravity;
  const platforms = state.platformFactory.platforms;
  const barrels = state.barrelFactory.barrels;
  const ladders = state.ladderFactory.ladders;

  const index = barrels.findIndex((b) => b.id === payload);
  if (index === -1) return;
  const barrel = barrels[index];

  let update = { ...barrel };

  const speed = isDirectionLeft(barrel.direction) ? -2 : 2;
  const ladder = checkLadders(barrel, ladders);

  if (
    ladder &&
    ladder.id &&
    barrel.ladders.includes(ladder.id) &&
    barrel.y > ladder.y + ladder.height
  ) {
    update = {
      ...update,
      x: update.x + speed * 12,
      y: update.y - 28,
      fallingSpeed: -2,
    };
  } else if (barrel.fallingSpeed !== 0) {
    update = {
      ...update,
      y: update.y + barrel.fallingSpeed * fps,
    };
  } else {
    update = {
      ...update,
      x: update.x + speed * fps,
    };
  }

  update = { ...update, ...checkBoundaries(update) };
  update = { ...update, ...checkPlatforms(update, platforms) };

  if (update.onAir && gravity && barrel.fallingSpeed === 0) {
    const gravitySpeed = -9 * fps;
    update = { ...update, y: update.y + gravitySpeed };
  }

  if (barrel.onAir && !update.onAir) {
    const direction = flipDirection(barrel.direction);
    update = { ...update, direction, fallingSpeed: 0 };
  }

  dispatch(setBarrel(update));
});

export const createBarrel = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("BarrelSlice/createBarrel", async (_, { getState, dispatch }) => {
  const state: RootState = getState();
  const ladders = state.ladderFactory.ladders;

  const barrel: Barrel = {
    ...state.barrelFactory,
    id: Date.now(),
    ladders: getRandomLadderIds(ladders),
    fallingSpeed: 0,
  };

  dispatch(slice.actions.createBarrel(barrel));
});

export const { setBarrelFactory, setBarrel, destroyBarrel } = slice.actions;
export default slice.reducer;
