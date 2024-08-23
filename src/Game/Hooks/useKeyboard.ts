import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";

type KeyHandler = {
  key: string;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
};

const useKeyboard = ({ key, onKeyDown, onKeyUp }: KeyHandler) => {
  const { reached } = useSelector((state: RootState) => state.goal);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (onKeyDown && (event.key === key || event.key === key.toLowerCase())) {
        onKeyDown();
      }
    },
    [key, onKeyDown]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (onKeyUp && (event.key === key || event.key === key.toLowerCase())) {
        onKeyUp();
      }
    },
    [key, onKeyUp]
  );

  useEffect(() => {
    if (reached) return;

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
  }, [handleKeyDown, handleKeyUp, onKeyDown, onKeyUp, reached]);
};

export const dispatchKeyDown = (key: string) => {
  const event = new KeyboardEvent("keydown", {
    key: key,
    code: key,
    bubbles: true,
    cancelable: true,
  });
  window.dispatchEvent(event);
};

export const dispatchKeyUp = (key: string) => {
  const event = new KeyboardEvent("keyup", {
    key: key,
    code: key,
    bubbles: true,
    cancelable: true,
  });
  window.dispatchEvent(event);
};

export default useKeyboard;
