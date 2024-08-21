import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { ROSTER, Features } from "../System/Roster";
import { setPlayer } from "../System/RosterSlice";
import "./Star.scss";

const PLAYER: Features = {
  code: "STAR",
  weapon: <div className="Star" />,
};
ROSTER[PLAYER.code] = PLAYER;

const Star: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.roster);
  const isStar = current === PLAYER.code;

  useKeyboard({
    key: PLAYER.code,
    onKeyDown: () => dispatch(setStar()),
  });

  return isStar ? PLAYER.weapon! : null;
};

const setStar = () => {
  return setPlayer(PLAYER.code);
};

export const isStar = () => {
  const { current } = useSelector((state: RootState) => state.roster);
  return current === PLAYER.code;
};

export default Star;
