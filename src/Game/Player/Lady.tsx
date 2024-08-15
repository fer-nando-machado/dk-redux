import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../reduxStore";
import useKeyboard from "../Hooks/useKeyboard";
import { setPlayer } from "../System/PlayerSelectSlice";
import "./Lady.scss";

const CODE = "LADY";
const Lady: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.playerSelect);
  const isLady = current === CODE;

  useKeyboard({
    key: CODE,
    onKeyDown: () => dispatch(setPlayer(CODE)),
  });

  return isLady ? <div className="Hat" /> : null;
};

export default Lady;
