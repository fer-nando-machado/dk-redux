import { name, repository, contact, support } from "../../package.json";
import { then } from "../Game/System/Options";
import useOnline from "../Game/Hooks/useOnline";
import AppIcon from "/favicon.ico?url";
import GitHubIcon from "/GitHub.svg?url";
import "./Navigation.scss";

const handleRestart = () => {
  const confirm = window.confirm(
    "This operation will erase all your progress and stored data. Proceed?"
  );
  if (confirm) {
    document.body.innerHTML = "Restarting...";
    sessionStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const Navigation: React.FC = () => {
  const isOnline = useOnline();
  return (
    <>
      <nav className={`${isOnline ? "" : "Offline"}`}>
        <span className="Download">
          <img src={AppIcon} alt="DK-Redux App Icon" />
          {isOnline ? "Add to Home Screen" : `#${then.slice(-4)}`}
        </span>
        <span className="Button Restart" onClick={handleRestart}>
          Restart
        </span>
      </nav>
      <footer className={`${isOnline ? "" : "Offline"}`}>
        <a href={`mailto:${contact}`} className="Button">
          Contact
        </a>
        <a href={repository.link}>
          <img src={GitHubIcon} alt={`${name} @ GitHub`} height={24} />
        </a>
        <a href={support} className="Button">
          Support
        </a>
      </footer>
    </>
  );
};

export default Navigation;
