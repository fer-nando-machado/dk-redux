import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jumpman } from "./Jumpman";
import { checkBoundaries, isOnPlatforms } from "./Position";
import { Dispatch, RootState } from "./Store";

const initialState: Jumpman = {
  x: 0,
  y: 0,
};

const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    setJumpman: (state, action: PayloadAction<Jumpman>) => {
      const { x, y } = action.payload;
      state.x = x;
      state.y = y;
    },
  },
});

export const moveJumpman = createAsyncThunk<
  void,
  Jumpman,
  {
    state: RootState;
    dispatch: Dispatch;
  }
>(
  "JumpmanSlice/moveJumpman",
  async (payload: Jumpman, { getState, dispatch }) => {
    const state: RootState = getState();
    const jumpman = state.jumpman;
    const platforms = state.platformFactory.platforms;

    const { x, y } = payload;
    const update = checkBoundaries({
      x: jumpman.x + x,
      y: jumpman.y + y,
    });

    const isVertical = x === 0 ? true : false;
    const isHorizontal = y === 0 ? true : false;
    const isOnPlatform = isOnPlatforms(update, platforms);

    if (y !== -3) {
      //console.log(update, isOnPlatform, isVertical, isHorizontal);

      if (isOnPlatform) {
        console.log("TRUE");
      }
    }

    if (isHorizontal) {
      dispatch(setJumpman(update));
    } else if (isVertical && !isOnPlatform) {
      dispatch(setJumpman(update));
    }
  }
);

export const { setJumpman } = slice.actions;
export default slice.reducer;
