import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";

enum RefreshRate {
  FPS30 = 1000 / 30,
  FPS60 = 1000 / 60,
}

const useInterval = (callback: () => void, ms: number = RefreshRate.FPS60) => {
  const paused = useSelector((state: RootState) => state.options.paused);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = () => {
    if (!callbackRef.current) return;
    callbackRef.current();
  };

  useEffect(() => {
    if (!paused && ms > 0) {
      intervalRef.current = setInterval(loop, ms);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paused, ms]);

  return intervalRef.current;
};

export default useInterval;
