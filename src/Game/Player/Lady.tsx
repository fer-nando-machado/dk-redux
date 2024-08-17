import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { ROSTER, Features } from "../System/Roster";
import { setPlayer } from "../System/RosterSlice";
import "./Lady.scss";

const PLAYER: Features = {
  code: "LADY",
  weapon: <div className="Hat" />,
};
ROSTER[PLAYER.code] = PLAYER;

const Lady: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.roster);
  const isLady = current === PLAYER.code;

  useKeyboard({
    key: PLAYER.code,
    onKeyDown: () => dispatch(setPlayer(PLAYER.code)),
  });

  return isLady ? PLAYER.weapon! : null;
};

export const getPartner = () => {
  const { players, current } = useSelector((state: RootState) => state.roster);
  if (!Boolean(players[PLAYER.code])) {
    return PLAYER.code;
  }
  const partners = Object.keys(players).filter((code) => code !== current);
  const randomPartner = partners[Math.floor(Math.random() * partners.length)];
  return randomPartner;
};

export default Lady;
