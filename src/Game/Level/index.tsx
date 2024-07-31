import { useDispatch } from "react-redux";
import { StoreDispatch } from "../reduxStore";

import { RIGHT, LEFT } from "./Block";

import { Platform, PlatformFactory } from "./Platform";
import { setPlatforms } from "./PlatformSlice";

import { Jumpman } from "../Player/Jumpman";
import { setJumpman } from "../Player/JumpmanSlice";

import { BarrelFactory } from "./Barrel";
import { setBarrelFactory } from "./BarrelSlice";

import { DuckFactory } from "../Player/Hunt/Duck";
import { setDuckFactory } from "../Player/Hunt/DuckSlice";

import { setMaker, setPlayer } from "../System/OptionsSlice";
import { useEffect } from "react";

export type CustomLevel = {
  jumpman?: Jumpman;
  platforms?: Platform[];
  barrelFactory?: BarrelFactory;
};

const JUMPMAN: Jumpman = {
  x: 25,
  y: 75,
  isJumping: false,
  direction: RIGHT,
};

const BARREL_FACTORY: BarrelFactory = {
  x: 450,
  y: 425,
  isJumping: false,
  direction: LEFT,
  barrels: [],
};

const DUCK_FACTORY: DuckFactory = {
  x: 250,
  y: -25,
  isJumping: false,
  direction: LEFT,
  ducks: [],
};

const PLATFORMS: Platform[] = [
  { x: 0, y: 700, length: 20 },
  { x: 55, y: 700, length: 500 },
  { x: 25, y: 625, length: 25 },
  { x: 100, y: 525, length: 175 },
  { x: 400, y: 425, length: 75 },
  { x: 0, y: 325, length: 425 },
  { x: 325, y: 225, length: 150 },
  { x: 125, y: 125, length: 200 },
  { x: 25, y: 25, length: 450 },
];

const Level: React.FC<CustomLevel> = ({
  jumpman = JUMPMAN,
  platforms = PLATFORMS,
  barrelFactory = BARREL_FACTORY,
}) => {
  const dispatch: StoreDispatch = useDispatch();

  useEffect(() => {
    const isMaker =
      jumpman !== JUMPMAN ||
      platforms !== PLATFORMS ||
      barrelFactory !== BARREL_FACTORY;
    dispatch(setMaker(isMaker));

    dispatch(setJumpman({ ...JUMPMAN, ...jumpman }));
    dispatch(setPlatforms(platforms));

    dispatch(setBarrelFactory({ ...BARREL_FACTORY, ...barrelFactory }));
    dispatch(setDuckFactory(DUCK_FACTORY));

    dispatch(setPlayer("M"));
    dispatch(setPlayer("D"));
  }, [jumpman, platforms, barrelFactory]);

  return (
    <>
      <PlatformFactory />
      <Jumpman />
      <BarrelFactory />
      <DuckFactory />
    </>
  );
};

export default Level;
