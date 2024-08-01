import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";

enum RefreshRate {
  FPS30 = 1000 / 30,
  FPS60 = 1000 / 60,
}

export const useIntervalFPS = (callback: () => void) => {
  const { paused, lowFPS } = useSelector((state: RootState) => state.options);
  const ms = lowFPS ? RefreshRate.FPS30 : RefreshRate.FPS60;
  return useInterval(callback, ms, paused);
};

export const useIntervalTimed = (callback: () => void, ms: number) => {
  const { paused } = useSelector((state: RootState) => state.options);
  return useInterval(callback, ms, paused);
};

const useInterval = (callback: () => void, ms: number, paused: boolean) => {
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
