import { useDispatch } from "react-redux";
import { StoreDispatch } from "./Store";

import { Jumpman } from "./Jumpman";
import { setJumpman } from "./JumpmanSlice";

import { BarrelFactory } from "./Barrel";
import { setBarrelFactory } from "./BarrelSlice";

import { PlatformFactory, Platform } from "./Platform";
import { setPlatforms } from "./PlatformSlice";

const jumpman: Jumpman = { x: 70, y: 750, direction: "right" };

const barrelFactory: BarrelFactory = { x: 475, y: 300, barrels: [] };

const platforms: Platform[] = [
  { x: 25, y: 35, length: 450, angle: 0 },
  { x: 150, y: 100, length: 200, angle: 0 },
  { x: 25, y: 175, length: 300, angle: 0 },
  { x: 25, y: 300, length: 100, angle: 0 },
  { x: 225, y: 317, length: 50, angle: 0 },
  { x: 50, y: 500, length: 50, angle: 0 },
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
