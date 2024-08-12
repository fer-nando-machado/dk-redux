import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import { setPlayer } from "../System/OptionsSlice";
import useKeyboard from "../Hooks/useKeyboard";
import "./Lady.scss";

const CODE = "LADY";
const Lady: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.options);

  const isLady = player.code === CODE;

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return isLady ? <div className="Hat" /> : null;
};

export default Lady;
