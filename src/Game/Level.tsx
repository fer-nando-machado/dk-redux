import { useDispatch } from "react-redux";
import { BarrelFactory } from "./Barrel";
import { PlatformFactory } from "./Platform";
import Jumpman, { Jumpman as JumpmanProps } from "./Jumpman";
import { Dispatch } from "./Store";
import { setPlatforms } from "./PlatformSlice";
import { setBarrelFactory } from "./BarrelSlice";
import { setJumpman } from "./JumpmanSlice";

const jumpman: JumpmanProps = { x: 70, y: 750 };

const barrelFactory = { x: 475, y: 300, barrels: [] };

const platforms = [
  { x: 25, y: 35, length: 450, angle: 0 },
  { x: 150, y: 100, length: 200, angle: 0 },
  { x: 25, y: 175, length: 300, angle: 0 },
  { x: 25, y: 300, length: 100, angle: 0 },
  { x: 225, y: 317, length: 50, angle: 0 },
  { x: 50, y: 500, length: 50, angle: 0 },
];

const Level: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
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
