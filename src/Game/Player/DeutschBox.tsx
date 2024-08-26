import ReactDeutschBox from "react-deutschbox";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { Song } from "../Hooks/useMusic";
import useKeyboard from "../Hooks/useKeyboard";
import { useIntervalFPS } from "../Hooks/useInterval";
import { setPlayer } from "../System/RosterSlice";
import { ROSTER, Features } from "../System/Roster";
import { moveJumpman } from "./JumpmanSlice";
import { setTarget, unsetTarget } from "../Level/LadderSlice";
import { generateRandomId, isDirectionLeft } from "../Level/Block";
import "./DeutschBox.scss";
import { checkLadders } from "../Level/Position";

const PLAYER: Features = {
  code: "D",
  touch: true,
  help: "HILFE!",
  theme: Song.LB99,
};
ROSTER[PLAYER.code] = PLAYER;

const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { direction, x, y } = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.roster);
  const { reached } = useSelector((state: RootState) => state.goal);
  const { ladders } = useSelector((state: RootState) => state.ladderFactory);

  const isDeutschBox = current === PLAYER.code;

  const [state, setState] = useState(0);
  const [key, setKey] = useState(0);

  const ref = useRef<HTMLInputElement>(null);
  const onClickDeutschBox = () => {
    if (reached || !ref.current) return;
    const button = ref.current.nextElementSibling as HTMLButtonElement;
    button.click();
  };

  const onChangeDeutschBox = () => {
    if (state == 0) {
      dispatch(setTarget({ x, y }));
    } else {
      dispatch(unsetTarget());
    }
    setState((c) => (c + 1) % 4);
  };

  const resetDeutschBox = () => {
    setState(0);
    setKey(generateRandomId());
  };

  useKeyboard({
    key: " ",
    onKeyDown: onClickDeutschBox,
  });

  useEffect(() => {
    resetDeutschBox();
  }, [current, reached]);

  useEffect(() => {
    window.addEventListener("level:reset", resetDeutschBox);
    return () => {
      window.removeEventListener("level:reset", resetDeutschBox);
    };
  }, []);

  useIntervalFPS(() => {
    if (reached || !isDeutschBox) return;

    const multiplier = state == 3 ? 5 : state == 1 ? 1 : 0;
    const speed = multiplier * (isDirectionLeft(direction) ? -1 : 1);

    const isOnLadder = checkLadders({ x, y }, ladders);
    if (speed) {
      dispatch(moveJumpman({ x: speed, y: 0 }));
    }
    if (isOnLadder?.target) {
      dispatch(moveJumpman({ x: 0, y: 3 }));
    }
  });

  useKeyboard({
    key: PLAYER.code,
    onKeyDown: () => dispatch(setPlayer(PLAYER.code)),
  });

  return isDeutschBox ? (
    <div className="DeutschBox" onClick={onClickDeutschBox}>
      <ReactDeutschBox
        name="DeutschBox"
        feedback={direction}
        onChange={onChangeDeutschBox}
        size={26}
        ref={ref}
        key={key}
      />
    </div>
  ) : null;
};

export default DeutschBox;
