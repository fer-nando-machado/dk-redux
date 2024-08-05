import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RIGHT } from "./Block";
import { Level } from ".";

const initialState: Level = {
  id: 1,
  platforms: [
    { x: 0, y: 700, length: 505 },
    { x: 150, y: 600, length: 100 },
    { x: 0, y: 500, length: 455 },
    { x: 50, y: 400, length: 455 },
    { x: 0, y: 300, length: 455 },
    { x: 50, y: 200, length: 455 },
    { x: 0, y: 100, length: 455 },
    { x: 25, y: 0, length: 505 },
  ],
  ladders: [
    { x: 125, y: 500, height: 200 },
    { x: 225, y: 500, height: 100 },
    { x: 425, y: 400, height: 100 },
    { x: 150, y: 300, height: 100 },
    { x: 50, y: 300, height: 100 },
    { x: 425, y: 200, height: 100 },
    { x: 250, y: 200, height: 100 },
    { x: 200, y: 100, height: 100 },
    { x: 50, y: 100, height: 100 },
    { x: 425, y: 0, height: 100 },
  ],
  jumpman: {
    x: 25,
    y: 75,
    onAir: true,
    jumpingSpeed: 0,
    walkingSpeed: 0,
    climbingSpeed: 0,
    direction: RIGHT,
  },
  barrelFactory: {
    x: 125,
    y: 500,
    onAir: false,
    direction: RIGHT,
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
