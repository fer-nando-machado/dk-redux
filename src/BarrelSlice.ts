import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Barrel, BarrelFactory } from "./Barrel";
import { isWithinBoundaries } from "./Position";

const initialState: BarrelFactory = {
  x: 475,
  y: 0,
  barrels: [],
};

const slice = createSlice({
  name: "barrelFactory",
  initialState,
  reducers: {
    createBarrel: (state, action: PayloadAction<Barrel>) => {
      state.barrels.push(action.payload);
    },
    moveBarrel: (state, action: PayloadAction<Barrel>) => {
      const { id, x, y } = action.payload;

      const index = state.barrels.findIndex((b) => b.id === id);
      if (index === -1) return;

      const update: Barrel = {
        x: state.barrels[index].x + x,
        y: state.barrels[index].y + y,
      };
      if (!isWithinBoundaries(update)) return;

      state.barrels[index] = {
        id: state.barrels[index].id,
        x: update.x,
        y: update.y,
      };
    },
    destroyBarrel: (state, action: PayloadAction<number>) => {
      state.barrels = state.barrels.filter((b) => b.id !== action.payload);
    },
  },
});
export const { createBarrel, moveBarrel, destroyBarrel } = slice.actions;
export default slice.reducer;
