import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "./OptionsSlice";
import statusReducer from "./StatusSlice";
import jumpmanReducer from "./JumpmanSlice";
import barrelReducer from "./BarrelSlice";
import duckReducer from "./DuckSlice";
import platformReducer from "./PlatformSlice";

export const Store = configureStore({
  reducer: {
    options: optionsReducer,
    jumpman: jumpmanReducer,
    status: statusReducer,
    barrelFactory: barrelReducer,
    platformFactory: platformReducer,
    duckFactory: duckReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type StoreDispatch = typeof Store.dispatch;
