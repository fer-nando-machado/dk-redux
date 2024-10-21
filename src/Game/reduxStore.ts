import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "./System/OptionsSlice";
import musicReducer from "./System/MusicSlice";
import statusReducer from "./System/StatusSlice";
import rosterReducer from "./System/RosterSlice";
import goalReducer from "./Level/GoalSlice";
import fireReducer from "./Level/FireSlice";
import barrelReducer from "./Level/BarrelSlice";
import ladderReducer from "./Level/LadderSlice";
import platformReducer from "./Level/PlatformSlice";
import jumpmanReducer from "./Player/JumpmanSlice";
import duckReducer from "./Player/Hunt/DuckSlice";

export const Store = configureStore({
  reducer: {
    options: optionsReducer,
    status: statusReducer,
    music: musicReducer,
    roster: rosterReducer,
    jumpman: jumpmanReducer,
    goal: goalReducer,
    barrelFactory: barrelReducer,
    fireFactory: fireReducer,
    ladderFactory: ladderReducer,
    platformFactory: platformReducer,
    duckFactory: duckReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof Store.getState>;
export type StoreDispatch = typeof Store.dispatch;
