import ReactDeutschBox from "react-deutschbox";
import { setSkin } from "../JumpmanSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "../Store";
import useKeyboard from "../useKeyboard";
import "./DeutschBox.scss";

const CODE = "D";
const DeutschBox: React.FC = () => {
  const dispatch: Dispatch = useDispatch();

  const setSkinDeutschBox = () => {
    dispatch(setSkin(CODE));
    const box = document.querySelector<HTMLButtonElement>(".deutschbox button");
    if (!box) return;
    box.click();
    box.focus();
  };

  useKeyboard({
    key: CODE,
    onKeyDown: () => {},
    onKeyUp: setSkinDeutschBox,
  });

  return <ReactDeutschBox name="DeutschBox" feedback="right" size={27.5} />;
};

export default DeutschBox;
