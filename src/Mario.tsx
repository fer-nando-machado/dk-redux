import { Position } from "./Position";

export const MarioSize = 25;

type MarioProps = Position & {};

const Mario: React.FC<MarioProps> = ({ x, y }) => {
  return (
    <div
      className="Mario Block"
      style={{
        left: x,
        bottom: y,
      }}
    />
  );
};

export default Mario;
