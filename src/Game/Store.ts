import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameSlice";
import jumpmanReducer from "./JumpmanSlice";
import barrelReducer from "./BarrelSlice";
import platformReducer from "./PlatformSlice";

export const Store = configureStore({
  reducer: {
    game: gameReducer,
    jumpman: jumpmanReducer,
    barrelFactory: barrelReducer,
    platformFactory: platformReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type Dispatch = typeof Store.dispatch;
