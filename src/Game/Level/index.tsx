import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";

import { RIGHT } from "./Block";

import { Ladder, LadderFactory } from "./Ladder";
import { setLadders } from "./LadderSlice";

import { Platform, PlatformFactory } from "./Platform";
import { setPlatforms } from "./PlatformSlice";

import { Jumpman } from "../Player/Jumpman";
import { setJumpman } from "../Player/JumpmanSlice";

import { BarrelFactory } from "./Barrel";
import { setBarrelFactory } from "./BarrelSlice";

import { DuckFactory } from "../Player/Hunt/Duck";
import { setDuckFactory } from "../Player/Hunt/DuckSlice";

import { resetOptions, setMaker, setPlayer } from "../System/OptionsSlice";

import { resetLevel, setLevel } from "./LevelSlice";
import { resetScore } from "../System/StatusSlice";

export type CustomLevel = Partial<Level>;

export type Level = {
  id: number;
  jumpman: Jumpman;
  ladders: Ladder[];
  platforms: Platform[];
  barrelFactory: BarrelFactory;
};

const Level: React.FC<CustomLevel> = (customLevel) => {
  const dispatch: StoreDispatch = useDispatch();
  const level = useSelector((state: RootState) => state.level);

  useEffect(() => {
    const isMaker = hasCustomLevel(customLevel);
    if (isMaker) {
      const { id, jumpman, barrelFactory, platforms, ladders } = customLevel;
      dispatch(setMaker(true));
      dispatch(
        setLevel({
          id: id || 0,
          ladders: ladders || [],
          platforms: platforms || [],
          jumpman: { ...JUMPMAN, ...jumpman },
          barrelFactory: { ...BARREL_FACTORY, ...barrelFactory },
        })
      );
    } else {
      dispatch(resetOptions());
      dispatch(resetLevel());
    }
  }, [customLevel]);

  useEffect(() => {
    dispatch(resetScore());
    dispatch(setJumpman(level.jumpman));
    dispatch(setLadders(level.ladders));
    dispatch(setPlatforms(level.platforms));
    dispatch(setBarrelFactory(level.barrelFactory));
    dispatch(setDuckFactory(DUCK_FACTORY));
  }, [level]);

  useEffect(() => {
    dispatch(setPlayer("D"));
    // dispatch(setPlayer("M"));
  }, []);

  return (
    <>
      <PlatformFactory />
      <LadderFactory />
      <BarrelFactory />
      <Jumpman />
      <DuckFactory />
    </>
  );
};

const hasCustomLevel = (customLevel: CustomLevel): boolean => {
  return customLevel != null && Object.keys(customLevel).length > 0;
};

const JUMPMAN: Jumpman = {
  x: 0,
  y: 750,
  isJumping: true,
  direction: RIGHT,
};

const BARREL_FACTORY: BarrelFactory = {
  x: 475,
  y: 725,
  isJumping: false,
  direction: RIGHT,
  barrels: [],
};

const DUCK_FACTORY: DuckFactory = {
  x: 250,
  y: -25,
  isJumping: false,
  direction: RIGHT,
  ducks: [],
};

export default Level;
