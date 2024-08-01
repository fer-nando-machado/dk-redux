import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../../reduxStore";
import useKeyboard from "../../Hooks/useKeyboard";
import { useIntervalFPS } from "../../Hooks/useInterval";
import { setPlayer } from "../../System/OptionsSlice";
import { moveJumpman } from "../JumpmanSlice";
import { isDirectionLeft } from "../../Level/Block";
import "./Dog.scss";

const CODE = "DH";
const Dog: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.options);
  const { direction } = useSelector((state: RootState) => state.jumpman);

  const isDog = player.code === CODE;
  const speed = isDirectionLeft(direction) ? -1 : 1;

  useIntervalFPS(() => {
    if (!isDog) return;
    dispatch(moveJumpman({ x: speed, y: 0 }));
  });

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return player.code === CODE ? <span>oo</span> : <></>;
};

export const isDuckHunting = () => {
  const { player } = useSelector((state: RootState) => state.options);
  return player.code === CODE;
};

export const hasUnlockedDuckHunting = () => {
  const { playerSelect } = useSelector((state: RootState) => state.options);
  return Boolean(playerSelect[CODE]);
};

export default Dog;
