import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Store";

const REFRESH_RATE = 1000 / 60;

const useInterval = (callback: () => void, ms: number = REFRESH_RATE) => {
  const paused = useSelector((state: RootState) => state.game.paused);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!paused) {
      interval.current = setInterval(callback, ms);
    } else if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [paused]);

  return interval.current;
};

export default useInterval;
