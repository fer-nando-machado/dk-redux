import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Store";

const useInterval = (callback: () => void, delay: number) => {
  const paused = useSelector((state: RootState) => state.game.paused);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!paused && interval.current === null) {
      interval.current = setInterval(callback, delay);
    } else if (paused && interval.current !== null) {
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
