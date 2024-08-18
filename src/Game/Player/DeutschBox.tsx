import ReactDeutschBox from "react-deutschbox";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { useIntervalFPS } from "../Hooks/useInterval";
import { setPlayer } from "../System/RosterSlice";
import { ROSTER, Features } from "../System/Roster";
import { moveJumpmanAuto } from "./JumpmanSlice";
import { isDirectionLeft } from "../Level/Block";
import "./DeutschBox.scss";

const PLAYER: Features = {
  code: "D",
  touch: true,
  help: "HILFE!",
};
ROSTER[PLAYER.code] = PLAYER;

const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { direction } = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.roster);
  const isDeutschBox = current === PLAYER.code;

  // TODO move to Slice
  const [state, setState] = useState(0);
  const multiplier = state == 3 ? 3 : state == 1 ? 1 : 0;
  const speed = multiplier * (isDirectionLeft(direction) ? -2 : 2);

  const ref = useRef<HTMLInputElement>(null);
  const onClickDeutschBox = () => {
    if (!ref.current) return;
    const button = ref.current.nextElementSibling as HTMLButtonElement;
    button.click();
  };

  useEffect(() => {
    setState(0);
  }, [current]);

  useIntervalFPS(() => {
    if (!isDeutschBox) return;
    dispatch(moveJumpmanAuto({ x: speed, y: 0 }));
  });

  useKeyboard({
    key: " ",
    onKeyDown: onClickDeutschBox,
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
        size={26}
        ref={ref}
        onChange={() => setState((c) => (c + 1) % 4)}
      />
    </div>
  ) : null;
};

export default DeutschBox;
