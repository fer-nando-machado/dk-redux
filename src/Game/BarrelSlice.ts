import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Barrel, BarrelFactory, MAX_BARRELS } from "./Barrel";
import { checkBoundaries } from "./Position";

const initialState: BarrelFactory = {
  x: 0,
  y: 0,
  barrels: [],
};

const slice = createSlice({
  name: "BarrelSlice",
  initialState,
  reducers: {
    setBarrelFactory: (state, action: PayloadAction<BarrelFactory>) => {
      const { x, y } = action.payload;
      state.x = x;
      state.y = y;
    },
    createBarrel: (state, action: PayloadAction<Barrel>) => {
      if (state.barrels.length == MAX_BARRELS) {
        state.barrels.shift();
      }
      state.barrels.push(action.payload);
    },
    moveBarrel: (state, action: PayloadAction<Barrel>) => {
      const { id, x, y } = action.payload;

      const index = state.barrels.findIndex((b) => b.id === id);
      if (index === -1) return;

      const update = checkBoundaries({
        x: state.barrels[index].x + x,
        y: state.barrels[index].y + y,
      });
      state.barrels[index] = {
        ...state.barrels[index],
        x: update.x,
        y: update.y,
      };
    },
    destroyBarrel: (state, action: PayloadAction<number>) => {
      state.barrels = state.barrels.filter((b) => b.id !== action.payload);
    },
  },
});

export const { setBarrelFactory, createBarrel, moveBarrel, destroyBarrel } =
  slice.actions;
export default slice.reducer;
