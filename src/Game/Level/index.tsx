import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../reduxStore";

import { LEFT, RIGHT } from "./Block";

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

import { resetOptions, setMaker, setPaused } from "../System/OptionsSlice";
import { setStarters } from "../System/RosterSlice";
import { resetScore } from "../System/StatusSlice";

import { Goal } from "./Goal";
import { setGoal } from "./GoalSlice";

export type CustomLevel = Partial<Level>;

export type Level = {
  id: number;
  jumpman: Jumpman;
  ladders: Ladder[];
  platforms: Platform[];
  barrelFactory: BarrelFactory;
  goal: Goal;
};

const LEVEL_1: Level = {
  id: 1,
  goal: { x: 204, y: 600, direction: RIGHT, onAir: false },
  platforms: [
    { x: 0, y: 700, length: 505 },
    { x: 200, y: 600, length: 100 },
    { x: 0, y: 500, length: 455 },
    { x: 50, y: 400, length: 455 },
    { x: 0, y: 300, length: 455 },
    { x: 50, y: 200, length: 455 },
    { x: 0, y: 100, length: 455 },
    { x: 25, y: 0, length: 480 },
  ],
  ladders: [
    { x: 130, y: 500, height: 200 },
    { x: 170, y: 500, height: 200 },
    { x: 270, y: 500, height: 100 },

    { x: 200, y: 480, height: 20 },
    { x: 200, y: 400, height: 50 },
    { x: 410, y: 400, height: 100 },

    { x: 70, y: 300, height: 100 },
    { x: 160, y: 300, height: 100 },
    { x: 370, y: 300, height: 30 },
    { x: 370, y: 375, height: 25 },

    { x: 135, y: 200, height: 35 },
    { x: 135, y: 275, height: 25 },
    { x: 410, y: 200, height: 100 },
    { x: 275, y: 200, height: 100 },

    { x: 225, y: 100, height: 100 },
    { x: 70, y: 100, height: 100 },

    { x: 410, y: 0, height: 100 },
    { x: 180, y: 85, height: 15 },
    { x: 180, y: 0, height: 25 },
  ],
  jumpman: {
    x: 25,
    y: 75,
    onAir: true,
    jumpingSpeed: 0,
    walkingSpeed: 0,
    climbingSpeed: 0,
    direction: RIGHT,
  },
  barrelFactory: {
    x: 50,
    y: 600,
    height: 200,
    width: 100,
    onAir: true,
    direction: LEFT,
    barrels: [],
  },
};

const LEVEL_0: Level = {
  id: 0,
  goal: { x: 0, y: 888, direction: LEFT, onAir: false },
  platforms: [],
  ladders: [],
  jumpman: {
    x: 0,
    y: 750,
    climbingSpeed: 0,
    jumpingSpeed: 0,
    walkingSpeed: 0,
    onAir: true,
    direction: RIGHT,
  },
  barrelFactory: {
    x: 475,
    y: 725,
    height: 100,
    width: 100,
    onAir: false,
    direction: RIGHT,
    barrels: [],
  },
};

const DUCK_FACTORY: DuckFactory = {
  x: 250,
  y: -25,
  onAir: false,
  direction: RIGHT,
  ducks: [],
};

const Level: React.FC<CustomLevel> = (customLevel) => {
  const dispatch: StoreDispatch = useDispatch();
  const [level, setLevel] = useState<Level>(LEVEL_1);

  useEffect(() => {
    const isMaker = hasCustomLevel(customLevel);
    if (isMaker) {
      const { jumpman, barrelFactory } = customLevel;
      dispatch(setMaker(true));
      setLevel({
        ...LEVEL_0,
        ...customLevel,
        jumpman: { ...LEVEL_0.jumpman, ...jumpman },
        barrelFactory: { ...LEVEL_0.barrelFactory, ...barrelFactory },
      });
    } else {
      handleReset();
    }
    dispatch(setPaused(!isMaker));
  }, [customLevel]);

  useEffect(() => {
    dispatch(resetScore());
    dispatch(setGoal(level.goal));
    dispatch(setJumpman(level.jumpman));
    dispatch(setLadders(level.ladders));
    dispatch(setPlatforms(level.platforms));
    dispatch(setBarrelFactory(level.barrelFactory));
    dispatch(setDuckFactory(DUCK_FACTORY));
  }, [level]);

  useEffect(() => {
    dispatch(setStarters(["M", "D"]));
    window.addEventListener("level:reset", handleReset);
    return () => {
      window.removeEventListener("level:reset", handleReset);
    };
  }, []);

  const handleReset = () => {
    dispatch(resetOptions());
    setLevel({ ...LEVEL_1 });
  };

  return (
    <>
      <PlatformFactory />
      <LadderFactory />
      <Goal />
      <Jumpman />
      <BarrelFactory />
      <DuckFactory />
    </>
  );
};

const hasCustomLevel = (customLevel: CustomLevel): boolean => {
  return customLevel != null && Object.keys(customLevel).length > 0;
};

export default Level;
