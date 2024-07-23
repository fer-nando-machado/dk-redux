import { useSelector } from "react-redux";
import { RootState } from "./Store";
import { Block } from "./Block";
import "./Platform.scss";

export type Platform = Block & {
  length?: number;
  angle?: number;
};

export type PlatformFactory = {
  platforms: Platform[];
};

const Platform: React.FC<Platform> = ({ x, y, length, angle = 0 }) => {
  if (!length) return <></>;

  const rotate =
    angle !== 0
      ? {
          transform: `rotate(${angle}deg)`,
          transformOrigin: "0 0",
        }
      : {};

  return (
    <div
      className="Platform Block"
      style={{
        left: x,
        bottom: y,
        width: length,
        ...rotate,
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
