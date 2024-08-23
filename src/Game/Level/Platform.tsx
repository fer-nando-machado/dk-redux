import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { Position } from "./Position";
import "./Platform.scss";

export type Platform = Position & {
  length: number;
};

export type PlatformFactory = {
  platforms: Platform[];
};

const Platform: React.FC<Platform> = ({ x, y, length }) => {
  return !length ? null : (
    <div
      className="Platform Block"
      style={{
        left: x,
        bottom: y,
        width: length,
      }}
    />
  );
};

export const PlatformFactory: React.FC = () => {
  const platformFactory = useSelector(
    (state: RootState) => state.platformFactory
  );

  return (
    <>
      {platformFactory.platforms.map((p, index) => (
        <Platform {...p} key={index} />
      ))}
    </>
  );
};
