import ReactDeutschBox from "react-deutschbox";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { useIntervalFPS } from "../Hooks/useInterval";
import { setPlayer } from "../System/PlayerSelectSlice";
import { moveJumpmanAuto } from "./JumpmanSlice";
import { isDirectionLeft } from "../Level/Block";
import "./DeutschBox.scss";

const CODE = "D";
const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { direction } = useSelector((state: RootState) => state.jumpman);
  const { current } = useSelector((state: RootState) => state.playerSelect);
  const isDeutschBox = current === CODE;

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
    key: "Shift",
    onKeyDown: onClickDeutschBox,
  });

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
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
