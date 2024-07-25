import { useSelector } from "react-redux";
import { RootState } from "../Store";
import "./Dog.scss";

const CODE = "DH";
const Dog: React.FC = () => {
  const { player } = useSelector((state: RootState) => state.options);
  return player === CODE ? <span>oo</span> : <></>;
};

export const isDuckHunting = () => {
  const { player } = useSelector((state: RootState) => state.options);
  return player === CODE;
};

export default Dog;
