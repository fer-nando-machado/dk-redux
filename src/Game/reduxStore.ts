import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "./System/OptionsSlice";
import statusReducer from "./System/StatusSlice";
import playerReducer from "./System/PlayerSelectSlice";
import goalReducer from "./Level/GoalSlice";
import barrelReducer from "./Level/BarrelSlice";
import ladderReducer from "./Level/LadderSlice";
import platformReducer from "./Level/PlatformSlice";
import jumpmanReducer from "./Player/JumpmanSlice";
import duckReducer from "./Player/Hunt/DuckSlice";

export const Store = configureStore({
  reducer: {
    playerSelect: playerReducer,
    options: optionsReducer,
    status: statusReducer,
    jumpman: jumpmanReducer,
    goal: goalReducer,
    barrelFactory: barrelReducer,
    ladderFactory: ladderReducer,
    platformFactory: platformReducer,
    duckFactory: duckReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type StoreDispatch = typeof Store.dispatch;
