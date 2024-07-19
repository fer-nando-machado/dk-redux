import { useEffect } from "react";

type KeyHandler = {
  key: string;
  onKeyDown: () => void;
  onKeyUp: () => void;
};

export function useKeyboard({ key, onKeyDown, onKeyUp }: KeyHandler) {
  function onKeyDownOverride(event: KeyboardEvent) {
    if (event.key === key) {
      event.preventDefault();
      onKeyDown();
    }
  }
  function onKeyUpOverride(event: KeyboardEvent) {
    if (event.key === key) {
      event.preventDefault();
      onKeyUp();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", onKeyDownOverride);
    window.addEventListener("keyup", onKeyUpOverride);
    return () => {
      window.removeEventListener("keydown", onKeyDownOverride);
      window.removeEventListener("keyup", onKeyUpOverride);
    };
  }, []);
}
