import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Barrel, BarrelFactory } from "./Barrel";
import {
  addPositionWithinTolerance,
  checkBoundaries,
  checkCollision,
  checkLadders,
  checkPlatforms,
} from "./Position";
import { RootState, StoreDispatch } from "../reduxStore";
import { flipDirection, isDirectionLeft, LEFT } from "./Block";
import { getRandomLadderIds } from "./Ladder";
import { addPoints } from "../System/StatusSlice";

const MAX_BARRELS = 5;

const initialState: BarrelFactory = {
  x: 0,
  y: 0,
  height: 100,
  width: 100,
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
  const debug = state.options.debug;
  const fps = state.options.lowFPS ? 2 : 1;
  const jumpman = state.jumpman;
  const gravity = state.options.gravity;
  const platforms = state.platformFactory.platforms;
  const barrels = state.barrelFactory.barrels;
  const ladders = state.ladderFactory.ladders;

  const index = barrels.findIndex((b) => b.id === payload);
  if (index === -1) return;
  const barrel = barrels[index];

  const isOnJumpman = checkCollision(barrel, jumpman);
  if (isOnJumpman && !debug) {
    window.dispatchEvent(new CustomEvent("level:reset"));
    return;
  }

  if (jumpman.onAir) {
    const isUnderJumpman = checkCollision(
      { x: barrel.x + 13, y: barrel.y + 50 },
      jumpman,
      { x: 1 * fps, y: 50 }
    );
    if (isUnderJumpman) {
      dispatch(
        addPoints({ position: { x: barrel.x, y: jumpman.y }, value: 100 })
      );
    }
  }

  let update = { ...barrel };
  const ladder = checkLadders(barrel, ladders);
  if (
    ladder &&
    ladder.id &&
    barrel.ladders.includes(ladder.id) &&
    barrel.y > ladder.y + ladder.height
  ) {
    update = {
      ...update,
      x: ladder.x,
      y: update.y - 27,
      fallingSpeed: -2,
    };
  } else if (barrel.fallingSpeed !== 0) {
    update = {
      ...update,
      y: update.y + barrel.fallingSpeed * fps,
    };
  } else {
    const speed = isDirectionLeft(barrel.direction) ? -2 : 2;
    update = {
      ...update,
      x: update.x + speed * fps,
    };
  }

  update = { ...update, ...checkBoundaries(update) };
  update = { ...update, ...checkPlatforms(update, platforms) };

  if (update.onAir && gravity && barrel.fallingSpeed === 0) {
    const gravitySpeed = -10 * fps;
    update = { ...update, y: update.y + gravitySpeed };
  } else if (!update.onAir && barrel.onAir) {
    const direction = flipDirection(barrel.direction);
    update = { ...update, direction, fallingSpeed: 0 };
  }

  if (index === 0) {
    update = {
      ...update,
      path: addPositionWithinTolerance(update.path, {
        x: update.x,
        y: update.y,
      }),
    };
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
    path: [],
  };

  dispatch(slice.actions.createBarrel(barrel));
});

export const { setBarrelFactory, setBarrel, destroyBarrel } = slice.actions;
export default slice.reducer;
