import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Store";

const REFRESH_RATE = 1000 / 60;

const useInterval = (callback: () => void, ms: number = REFRESH_RATE) => {
  const paused = useSelector((state: RootState) => state.options.paused);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const tick = () => {
    if (!callbackRef.current) return;
    callbackRef.current();
  };

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(tick, ms);
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
