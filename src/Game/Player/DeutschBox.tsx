import ReactDeutschBox from "react-deutschbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../Store";
import { useEffect, useRef } from "react";
import useKeyboard from "../useKeyboard";
import { setPlayer } from "../JumpmanSlice";
import "./DeutschBox.scss";

const CODE = "D";
const DeutschBox: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { direction, player } = useSelector(
    (state: RootState) => state.jumpman
  );

  const ref = useRef<HTMLInputElement>(null);
  const clickDeutschBox = () => {
    if (!ref.current) return;
    const button = ref.current.nextElementSibling as HTMLButtonElement;
    button.click();
  };

  useEffect(() => {
    clickDeutschBox();
  }, [player]);

  useKeyboard({
    key: CODE,
    onKeyUp: () => dispatch(setPlayer(CODE)),
  });
  useKeyboard({
    key: " ",
    onKeyUp: clickDeutschBox,
  });

  return player === CODE ? (
    <ReactDeutschBox
      name="DeutschBox"
      feedback={direction}
      size={26}
      ref={ref}
    />
  ) : (
    <></>
  );
};

export default DeutschBox;
