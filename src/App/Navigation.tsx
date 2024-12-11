import { name, repository, support } from "../../package.json";
import { then } from "../Game/System/Options";
import useOnline from "../Game/Hooks/useOnline";
import AppIcon from "/favicon.ico?url";
import GitHubIcon from "/GitHub.svg?url";
import { useEffect, useState } from "react";
import "./Navigation.scss";

const isMobileDevice = () => {
  return /Mobi|Android|iPad|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
};

const Navigation: React.FC = () => {
  const isOnline = useOnline();
  const isMobile = isMobileDevice();

  const [isInstallable, setInstallable] = useState<boolean>(true);
  const handleInstallPrompt = () => setInstallable(true);
  const handleAppInstalled = () => setInstallable(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((sw) => {
        const activated = sw.active?.state === "activated";
        setInstallable(!activated);
      });
    }

    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  return (
    <>
      <nav className={`${isOnline ? "" : "Offline"}`}>
        <span
          className={`Download ${isInstallable ? "" : "Installed"} ${
            isMobile ? "Mobile" : "Desktop"
          } `}
        >
          <img src={AppIcon} alt="DK-Redux App Icon" />
          <span>
            {isInstallable
              ? isMobile
                ? "Add to Home Screen"
                : "Install App"
              : `#${then.slice(-4)}`}
          </span>
        </span>
      </nav>
      <footer className={`${isOnline ? "" : "Offline"}`}>
        <a href={repository.link}>
          <img src={GitHubIcon} alt={`${name} @ GitHub`} height={24} />
        </a>
        <a href={support} className="Button">
          Insert Coin
        </a>
      </footer>
    </>
  );
};

export default Navigation;
