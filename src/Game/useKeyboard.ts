import { useEffect } from "react";

type KeyHandler = {
  key: string;
  onKeyDown: () => void;
  onKeyUp: () => void;
};

const useKeyboard = ({ key, onKeyDown, onKeyUp }: KeyHandler) => {
  const onKeyDownOverride = (event: KeyboardEvent) => {
    if (event.key === key || event.key === key.toLowerCase()) {
      event.preventDefault();
      onKeyDown();
    }
  };
  const onKeyUpOverride = (event: KeyboardEvent) => {
    if (event.key === key || event.key === key.toLowerCase()) {
      event.preventDefault();
      onKeyUp();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownOverride);
    window.addEventListener("keyup", onKeyUpOverride);
    return () => {
      window.removeEventListener("keydown", onKeyDownOverride);
      window.removeEventListener("keyup", onKeyUpOverride);
    };
  }, []);
};

export default useKeyboard;
