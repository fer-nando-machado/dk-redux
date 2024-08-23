import { name, repository, contact, support } from "../../package.json";
import { then } from "../Game/System/Options";
import useOnline from "../Game/Hooks/useOnline";
import AppIcon from "/favicon.ico?url";
import GitHubIcon from "/GitHub.svg?url";
import "./Navigation.scss";
import { useEffect, useState } from "react";

const handleRestart = () => {
  const confirm = window.confirm(
    "This operation will erase all your progress and stored data. Proceed?"
  );
  if (confirm) {
    document.body.innerHTML = "<b>Restart</b><br/>";
    setTimeout(performRestart, 444);
  }
};

const performRestart = async () => {
  if ("serviceWorker" in navigator) {
    document.body.innerHTML += "Unregistering Service Workers...<br/>";
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
      await registration.unregister();
    }
  }

  document.body.innerHTML += "Deleting Cache...<br/>";
  const cacheNames = await caches.keys();
  for (let cacheName of cacheNames) {
    await caches.delete(cacheName);
  }

  document.body.innerHTML += "Clearing Storages...<br/>";
  localStorage.clear();
  sessionStorage.clear();

  document.body.innerHTML += "Reloading Game...<br/>";
  window.location.reload();
  document.body.innerHTML += "<b>READY!</b>";
};

const isMobileDevice = () => {
  return /Mobi|Android|iPad|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
};

const Navigation: React.FC = () => {
  const isOnline = useOnline();
  const isMobile = isMobileDevice();
  const [isInstallable, setInstallable] = useState<boolean>(isMobile);
  const handleInstallPrompt = () => setInstallable(true);
  const handleAppInstalled = () => setInstallable(false);

  useEffect(() => {
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
            {isInstallable && isOnline
              ? isMobile
                ? "Add to Home Screen"
                : "Install App"
              : `#${then.slice(-4)}`}
          </span>
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
