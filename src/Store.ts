import { configureStore } from "@reduxjs/toolkit";
import jumpmanReducer from "./JumpmanSlice";
import barrelReducer from "./BarrelSlice";

export const Store = configureStore({
  reducer: {
    jumpman: jumpmanReducer,
    barrelFactory: barrelReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
