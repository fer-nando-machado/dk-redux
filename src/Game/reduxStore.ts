import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

const combinedReducer = combineReducers({
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
});

const persistableReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["roster", "music", "options"],
  },
  combinedReducer
);

export const Store = configureStore({
  reducer: persistableReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const StorePersistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type StoreDispatch = typeof Store.dispatch;
