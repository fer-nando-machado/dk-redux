import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../../reduxStore";
import { Song } from "../../Hooks/useMusic";
import useKeyboard from "../../Hooks/useKeyboard";
import { useIntervalFPS } from "../../Hooks/useInterval";
import { setPlayer } from "../../System/RosterSlice";
import { Features, ROSTER } from "../../System/Roster";
import { moveJumpman, toggleDirection } from "../JumpmanSlice";
import { isDirectionLeft } from "../../Level/Block";
import "./Dog.scss";
import { checkLadders } from "../../Level/Position";
import { unsetTarget } from "../../Level/LadderSlice";
import { useMemo } from "react";

const PLAYER: Features = {
  code: "DH",
  touch: true,
  weapon: <div className="Eyes" />,
  help: "WOOF!",
  theme: Song.Hunter,
};
ROSTER[PLAYER.code] = PLAYER;

const Dog: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const jumpman = useSelector((state: RootState) => state.jumpman);
  const { reached } = useSelector((state: RootState) => state.goal);
  const { ladders } = useSelector((state: RootState) => state.ladderFactory);

  const isDog = isDuckHunting();

  const speed = useMemo(() => {
    const target = ladders.find((l) => l.target);
    if (target) {
      return jumpman.x > target.x ? -1 : 1;
    }
    return isDirectionLeft(jumpman.direction) ? -1 : 1;
  }, [ladders, jumpman.direction]);

  useIntervalFPS(() => {
    if (!isDog || reached) return;
    dispatch(moveJumpman({ x: speed, y: 0 }));

    const currentLadder = checkLadders(jumpman, ladders);
    if (currentLadder?.target && Math.abs(jumpman.x - currentLadder.x) < 5) {
      dispatch(unsetTarget());
      dispatch(moveJumpman({ x: 0, y: currentLadder.height }));
      dispatch(toggleDirection());
    }
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
