import { Position } from "./Position";

export const MarioSize = 25;

type MarioProps = Position & {};

const Mario: React.FC<MarioProps> = ({ x, y }) => {
  return (
    <div
      className="Mario"
      style={{
        left: x,
        bottom: y,
        width: MarioSize,
        height: MarioSize,
        borderRadius: MarioSize,
      }}
    />
  );
};

export default Mario;
