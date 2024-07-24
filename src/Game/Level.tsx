import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";

import { Jumpman } from "./Jumpman";
import { setJumpman } from "./JumpmanSlice";

import { BarrelFactory } from "./Barrel";
import { setBarrelFactory } from "./BarrelSlice";

import { PlatformFactory, Platform } from "./Platform";
import { setPlatforms } from "./PlatformSlice";
import { RIGHT, LEFT } from "./Block";

const jumpman: Jumpman = {
  x: 70,
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

const platforms: Platform[] = [
  { x: 50, y: 625, length: 50 },
  { x: 175, y: 525, length: 175 },
  { x: 400, y: 425, length: 75 },
  { x: 0, y: 325, length: 425 },
  { x: 325, y: 225, length: 150 },
  { x: 125, y: 125, length: 200 },
  { x: 25, y: 25, length: 450 },
];

const Level: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  dispatch(setPlatforms(platforms));
  dispatch(setBarrelFactory(barrelFactory));
  dispatch(setJumpman(jumpman));

  return (
    <>
      <PlatformFactory />
      <BarrelFactory />
      <Jumpman />
    </>
  );
};

export default Level;
