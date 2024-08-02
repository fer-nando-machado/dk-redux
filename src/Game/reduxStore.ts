import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "./System/OptionsSlice";
import statusReducer from "./System/StatusSlice";
import levelReducer from "./Level/LevelSlice";
import barrelReducer from "./Level/BarrelSlice";
import ladderReducer from "./Level/LadderSlice";
import platformReducer from "./Level/PlatformSlice";
import jumpmanReducer from "./Player/JumpmanSlice";
import duckReducer from "./Player/Hunt/DuckSlice";

export const Store = configureStore({
  reducer: {
    level: levelReducer,
    options: optionsReducer,
    jumpman: jumpmanReducer,
    status: statusReducer,
    barrelFactory: barrelReducer,
    ladderFactory: ladderReducer,
    platformFactory: platformReducer,
    duckFactory: duckReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type StoreDispatch = typeof Store.dispatch;
