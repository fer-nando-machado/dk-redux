import { useEffect, useCallback } from "react";

type KeyHandler = {
  key: string;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
};

const useKeyboard = ({ key, onKeyDown, onKeyUp }: KeyHandler) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (onKeyDown && (event.key === key || event.key === key.toLowerCase())) {
        event.preventDefault();
        onKeyDown();
      }
    },
    [key, onKeyDown]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (onKeyUp && (event.key === key || event.key === key.toLowerCase())) {
        event.preventDefault();
        onKeyUp();
      }
    },
    [key, onKeyUp]
  );

  useEffect(() => {
    if (onKeyDown) {
      window.addEventListener("keydown", handleKeyDown);
    }
    if (onKeyUp) {
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      if (onKeyDown) {
        window.removeEventListener("keydown", handleKeyDown);
      }
      if (onKeyUp) {
        window.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [handleKeyDown, handleKeyUp, onKeyDown, onKeyUp]);
};

export const dispatchKeyDown = (key: string) => {
  const event = new KeyboardEvent("keydown", {
    key: key,
    code: key,
    bubbles: true,
  });
  window.dispatchEvent(event);
};

export default useKeyboard;
