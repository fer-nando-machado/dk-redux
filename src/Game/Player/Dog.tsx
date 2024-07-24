import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../Store";
import { setPlayer } from "../JumpmanSlice";
import "./Dog.scss";

export const DH_CODE = "DH";
const Dog: React.FC = () => {
  const dispatch: StoreDispatch = useDispatch();
  const { player } = useSelector((state: RootState) => state.jumpman);

  const onClick = () => dispatch(setPlayer(DH_CODE));

  return player === DH_CODE ? (
    <span>oo</span>
  ) : (
    <aside className="Block" onClick={onClick}></aside>
  );
};

export default Dog;
