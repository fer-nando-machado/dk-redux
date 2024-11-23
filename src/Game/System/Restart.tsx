import useOnline from "../Hooks/useOnline";

const handleRestart = () => {
  const confirm = window.confirm(
    "⚠️ Restarting will erase all your progress and stored data. Proceed?"
  );
  if (confirm) {
    document.body.innerHTML = "<b>RESTART</b><br/>";
    setTimeout(performRestart, 444);
  }
};

const performRestart = async () => {
  if ("serviceWorker" in navigator) {
    document.body.innerHTML += "Unregistering Services...<br/>";
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

const Restart: React.FC = () => {
  const isOnline = useOnline();
  return isOnline ? (
    <>
      <u>SAVE DATA</u>
      <pre onClick={handleRestart}>
        ⚠️ RESTART? <small>(requires online connection)</small>
      </pre>
    </>
  ) : null;
};

export default Restart;
