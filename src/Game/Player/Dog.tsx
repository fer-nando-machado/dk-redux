import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../Store";
import { setPlayer } from "../JumpmanSlice";
import "./Dog.scss";

const CODE = "DH";
const Dog: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.jumpman);

  const onClick = () => dispatch(setPlayer(CODE));

  return player === CODE ? (
    <span>oo</span>
  ) : (
    <aside className="Block" onClick={onClick}></aside>
  );
};

export default Dog;
