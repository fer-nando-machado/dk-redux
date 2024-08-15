import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../../reduxStore";
import useKeyboard from "../../Hooks/useKeyboard";
import { useIntervalFPS } from "../../Hooks/useInterval";
import { setPlayer } from "../../System/PlayerSelectSlice";
import { moveJumpman } from "../JumpmanSlice";
import { isDirectionLeft } from "../../Level/Block";
import "./Dog.scss";

const CODE = "DH";
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
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return isDog ? <span>oo</span> : null;
};

export const isDuckHunting = () => {
  const { current } = useSelector((state: RootState) => state.playerSelect);
  return current === CODE;
};

export const hasUnlockedDuckHunting = () => {
  const { players } = useSelector((state: RootState) => state.playerSelect);
  return Boolean(players[CODE]);
};

export default Dog;
