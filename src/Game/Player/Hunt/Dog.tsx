import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../../reduxStore";
import useKeyboard from "../../Hooks/useKeyboard";
import { useIntervalFPS } from "../../Hooks/useInterval";
import { setPlayer } from "../../System/RosterSlice";
import { Features, ROSTER } from "../../System/Roster";
import { moveJumpman } from "../JumpmanSlice";
import { isDirectionLeft } from "../../Level/Block";
import "./Dog.scss";

const PLAYER: Features = {
  code: "DH",
  touch: true,
  weapon: <>oo</>,
};
ROSTER[PLAYER.code] = PLAYER;

const Dog: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { direction } = useSelector((state: RootState) => state.jumpman);

  const isDog = isDuckHunting();
  const speed = isDirectionLeft(direction) ? -1 : 1;

  useIntervalFPS(() => {
    if (!isDog) return;
    dispatch(moveJumpman({ x: speed, y: 0 }));
  });

  useKeyboard({
    key: PLAYER.code,
    onKeyDown: () => dispatch(setPlayer(PLAYER.code)),
  });

  return isDog ? PLAYER.weapon! : null;
};

export const isDuckHunting = () => {
  const { current } = useSelector((state: RootState) => state.roster);
  return current === PLAYER.code;
};

export const hasUnlockedDuckHunting = () => {
  const { players } = useSelector((state: RootState) => state.roster);
  return Boolean(players[PLAYER.code]);
};

export default Dog;
