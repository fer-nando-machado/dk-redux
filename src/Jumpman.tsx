import { Position } from "./Position";

type Jumpman = Position & {};

const Jumpman: React.FC<Jumpman> = ({ x, y }) => {
  return (
    <div
      className="Jumpman Block"
      style={{
        left: x,
        bottom: y,
      }}
    />
  );
};

export default Jumpman;
