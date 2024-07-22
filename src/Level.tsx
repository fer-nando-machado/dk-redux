import { useDispatch } from "react-redux";
import { BarrelFactory } from "./Barrel";
import { PlatformFactory } from "./Platform";
import { AppDispatch } from "./Store";
import { setPlatforms } from "./PlatformSlice";
import { setBarrelFactory } from "./BarrelSlice";

const barrelFactory = { x: 475, y: 0, barrels: [] };

const platforms = [
  { x: 25, y: 35, length: 450, angle: 0 },
  { x: 50, y: 155, length: 400, angle: 10 },
  { x: 25, y: 200, length: 300, angle: -10 },
  { x: 25, y: 300, length: 200, angle: -5 },
  { x: 225, y: 317, length: 200, angle: 5 },
  { x: 100, y: 400, length: 400, angle: -45 },
];

const Level: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  dispatch(setBarrelFactory(barrelFactory));
  dispatch(setPlatforms(platforms));

  return (
    <>
      <BarrelFactory />
      <PlatformFactory />
    </>
  );
};

export default Level;
