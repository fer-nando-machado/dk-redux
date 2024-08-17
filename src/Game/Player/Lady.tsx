import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { ROSTER, Features, PlayerRecord } from "../System/Roster";
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
    onKeyDown: () => dispatch(setLady()),
  });

  return isLady ? PLAYER.weapon! : null;
};

export const getPartner = () => {
  const { players, current } = useSelector((state: RootState) => state.roster);
  if (!hasUnlockedLady(players)) {
    return PLAYER.code;
  }
  const partners = Object.keys(players).filter((code) => code !== current);
  const randomPartner = partners[Math.floor(Math.random() * partners.length)];
  return randomPartner;
};

export const hasUnlockedLady = (players: PlayerRecord) => {
  return Boolean(players[PLAYER.code]);
};

export const setLady = () => {
  return setPlayer(PLAYER.code);
};

export default Lady;
