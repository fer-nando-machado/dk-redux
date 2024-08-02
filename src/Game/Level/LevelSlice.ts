import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RIGHT, LEFT } from "./Block";
import { Level } from ".";

const initialState: Level = {
  id: 1,
  platforms: [
    { x: 0, y: 700, length: 505 },
    { x: 25, y: 625, length: 25 },
    { x: 100, y: 525, length: 175 },
    { x: 400, y: 425, length: 75 },
    { x: 25, y: 325, length: 350 },
    { x: 325, y: 225, length: 150 },
    { x: 125, y: 125, length: 200 },
    { x: 25, y: 25, length: 450 },
  ],
  jumpman: {
    x: 25,
    y: 400,
    isJumping: false,
    direction: RIGHT,
  },
  barrelFactory: {
    x: 450,
    y: 425,
    isJumping: false,
    direction: LEFT,
    barrels: [],
  },
};

const slice = createSlice({
  name: "LevelSlice",
  initialState,
  reducers: {
    setLevel: (_, action: PayloadAction<Level>) => {
      return action.payload;
    },
    resetLevel: () => {
      return { ...initialState };
    },
  },
});
export const { setLevel, resetLevel } = slice.actions;
export default slice.reducer;
