import ReactDeutschBox from "react-deutschbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { useEffect, useRef, useState } from "react";
import { setPlayer } from "../System/OptionsSlice";
import useKeyboard from "../Hooks/useKeyboard";
import useInterval from "../Hooks/useInterval";
import { moveJumpmanAuto } from "./JumpmanSlice";
import { isDirectionLeft } from "../Level/Block";
import "./DeutschBox.scss";

const CODE = "D";
const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.options);
  const { direction } = useSelector((state: RootState) => state.jumpman);

  const isDeutschBox = player.code === CODE;

  const [checked, setChecked] = useState(0);
  const multiplier = checked == 3 ? 3 : checked == 1 ? 1 : 0;
  const speed = multiplier * (isDirectionLeft(direction) ? -2 : 2);

  const ref = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (!ref.current) return;
    const button = ref.current.nextElementSibling as HTMLButtonElement;
    button.click();
  };

  useEffect(() => {
    setChecked(0);
  }, [player.code]);

  useInterval(
    () => {
      dispatch(moveJumpmanAuto({ x: speed, y: 0 }));
    },
    isDeutschBox ? undefined : 0
  );

  useKeyboard({
    key: "Shift",
    onKeyDown: handleClick,
  });

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return isDeutschBox ? (
    <div className="DeutschBox" onClick={handleClick}>
      <ReactDeutschBox
        name="DeutschBox"
        feedback={direction}
        size={26}
        ref={ref}
        onChange={() => setChecked((c) => (c + 1) % 4)}
      />
    </div>
  ) : null;
};

export default DeutschBox;
