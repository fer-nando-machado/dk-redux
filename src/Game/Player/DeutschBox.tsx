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
import { isDirectionLeft } from "../Level/Block";
import "./DeutschBox.scss";

const PLAYER: Features = {
  code: "D",
  touch: true,
  help: "HILFE!",
  theme: Song.LB99,
};
ROSTER[PLAYER.code] = PLAYER;

const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { direction } = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.roster);
  const { reached } = useSelector((state: RootState) => state.goal);
  const isDeutschBox = current === PLAYER.code;

  const [state, setState] = useState(0);
  const [key, setKey] = useState(0);

  const multiplier = state == 3 ? 5 : state == 1 ? 1 : 0;
  const speed = multiplier * (isDirectionLeft(direction) ? -1 : 1);

  const ref = useRef<HTMLInputElement>(null);
  const onClickDeutschBox = () => {
    if (reached || !ref.current) return;
    const button = ref.current.nextElementSibling as HTMLButtonElement;
    button.click();
  };

  const resetDeutschBox = () => {
    setState(0);
    setKey(Math.trunc(Math.random() * Date.now()));
  };

  const changeDeutschBox = () => setState((c) => (c + 1) % 4);

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
    if (!isDeutschBox || reached) return;
    dispatch(moveJumpman({ x: speed, y: 0 }));
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
        onChange={changeDeutschBox}
        size={26}
        ref={ref}
        key={key}
      />
    </div>
  ) : null;
};

export default DeutschBox;
