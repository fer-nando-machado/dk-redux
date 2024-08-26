import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Platform, PlatformFactory } from "./Platform";

const initialState: PlatformFactory = {
  platforms: [],
};
const slice = createSlice({
  name: "PlatformSlice",
  initialState,
  reducers: {
    setPlatforms: (state, action: PayloadAction<Platform[]>) => {
      state.platforms = action.payload.map((platform) => ({
        ...platform,
        id: Math.trunc(Date.now() * Math.random()),
      }));
    },
  },
});
export const { setPlatforms } = slice.actions;
export default slice.reducer;
