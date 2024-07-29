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

import { setPlayer } from "../System/OptionsSlice";

const jumpman: Jumpman = {
  x: 25,
  y: 750,
  isJumping: false,
  direction: RIGHT,
};

const barrelFactory: BarrelFactory = {
  x: 450,
  y: 425,
  isJumping: false,
  barrels: [],
  direction: LEFT,
};

const duckFactory: DuckFactory = {
  x: 250,
  y: -25,
  isJumping: false,
  ducks: [],
  direction: LEFT,
};

const platforms: Platform[] = [
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

const Level: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  dispatch(setJumpman(jumpman));
  dispatch(setPlatforms(platforms));
  dispatch(setBarrelFactory(barrelFactory));
  dispatch(setDuckFactory(duckFactory));
  dispatch(setPlayer("D"));
  dispatch(setPlayer("M"));

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
