import { useEffect, useState } from "react";

const useHash = (): string => {
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const readHash = () => {
      const urlHash = window.location.hash;
      setHash(urlHash.startsWith("#") ? urlHash.slice(1) : urlHash);
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
    };
  }, []);

  return hash;
};

export default useHash;
