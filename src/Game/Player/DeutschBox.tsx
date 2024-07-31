import ReactDeutschBox from "react-deutschbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useRef, useState } from "react";
import { setPlayer } from "../System/OptionsSlice";
import useKeyboard from "../Hooks/useKeyboard";
import "./DeutschBox.scss";
import useInterval from "../Hooks/useInterval";
import { moveJumpman } from "./JumpmanSlice";
import { isDirectionLeft } from "../Level/Block";

const CODE = "D";
const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.options);
  const { direction } = useSelector((state: RootState) => state.jumpman);

  const speed = isDirectionLeft(direction) ? -2 : 2;
  const [multiplier, setMultiplier] = useState<number>(0);

  const isDeutschBox = player.code === CODE;

  const ref = useRef<HTMLInputElement>(null);
  const clickDeutschBox = () => {
    if (!ref.current) return;
    const button = ref.current.nextElementSibling as HTMLButtonElement;
    const state = button.className;
    const isGonnaDOCH = state === "dechecked";
    const isGonnaJA = state === "unchecked";
    setMultiplier(isGonnaDOCH ? 3 : isGonnaJA ? 1 : 0);
    button.click();
  };

  useKeyboard({
    key: "Shift",
    onKeyDown: clickDeutschBox,
  });

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  useInterval(
    () => {
      dispatch(moveJumpman({ x: multiplier * speed, y: 0 }));
    },
    isDeutschBox ? undefined : 0
  );

  return isDeutschBox ? (
    <div className="DeutschBox" onClick={clickDeutschBox}>
      <ReactDeutschBox
        name="DeutschBox"
        feedback={direction}
        size={26}
        ref={ref}
      />
    </div>
  ) : null;
};

export default DeutschBox;
