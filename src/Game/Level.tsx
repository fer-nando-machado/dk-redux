import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";

import { Jumpman } from "./Jumpman";
import { setJumpman } from "./JumpmanSlice";

import { BarrelFactory } from "./Barrel";
import { setBarrelFactory } from "./BarrelSlice";

import { PlatformFactory, Platform } from "./Platform";
import { setPlatforms } from "./PlatformSlice";

import { DuckFactory } from "./Duck";
import { setDuckFactory } from "./DuckSlice";

import { LEFT, RIGHT } from "./Block";
import { setPlayer } from "./OptionsSlice";

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
  dispatch(setPlatforms(platforms));
  dispatch(setDuckFactory(duckFactory));
  dispatch(setBarrelFactory(barrelFactory));
  dispatch(setJumpman(jumpman));
  dispatch(setPlayer("D"));

  return (
    <>
      <PlatformFactory />
      <BarrelFactory />
      <DuckFactory />
      <Jumpman />
    </>
  );
};

export default Level;
