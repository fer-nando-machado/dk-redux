import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { Position } from "./Position";
import "./Platform.scss";

export type Platform = Position & {
  id?: number;
  length: number;
  skew?: boolean;
};

export type PlatformFactory = {
  platforms: Platform[];
};

const Platform: React.FC<Platform> = ({ x, y, length, skew }) => {
  return !length ? null : (
    <div
      className={`Platform Block ${skew ? "Skew" : ""}`}
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
      {platformFactory.platforms.map((p) => (
        <Platform {...p} key={p.id} />
      ))}
    </>
  );
};
