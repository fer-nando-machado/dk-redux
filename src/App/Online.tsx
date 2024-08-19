import useOnline from "../Game/Hooks/useOnline";
import AppIcon from "/favicon.ico";
import "./Online.scss";

const Online: React.FC = () => {
  const isOnline = useOnline();
  return (
    <span className={`Online ${isOnline ? "" : "Offline"}`}>
      <img src={AppIcon} alt="DK-Redux App Icon" />
      {isOnline ? "Add to Home Screen" : ""}
    </span>
  );
};

export default Online;
