import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Platform, PlatformFactory } from "./Platform";
import { generateRandomId } from "./Block";

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
        id: generateRandomId(),
      }));
    },
  },
});
export const { setPlatforms } = slice.actions;
export default slice.reducer;
