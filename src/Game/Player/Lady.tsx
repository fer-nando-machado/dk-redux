import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { Song } from "../Hooks/useMusic";
import useKeyboard from "../Hooks/useKeyboard";
import { ROSTER, Features, Roster } from "../System/Roster";
import { setPlayer } from "../System/RosterSlice";
import "./Lady.scss";

const PLAYER: Features = {
  code: "LADY",
  weapon: <div className="Hat" />,
  theme: Song.Bop,
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

export const getLadyOrRandomPartner = ({ players, current }: Roster) => {
  if (!Boolean(players[PLAYER.code])) {
    return PLAYER.code;
  }
  const partners = Object.keys(players).filter((code) => code !== current);
  const randomPartner = partners[Math.floor(Math.random() * partners.length)];
  return randomPartner;
};

export default Lady;
