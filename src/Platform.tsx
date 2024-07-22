import { Position } from "./Position";
import "./Platform.scss";

export type Platform = Position & {
  length: number;
  angle?: number;
};

const Platform: React.FC<Platform> = ({ x, y, length, angle = 0 }) => {
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

export default Platform;
