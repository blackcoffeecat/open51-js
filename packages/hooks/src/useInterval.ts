import { useEffect, useRef } from 'react';
import useEffectRef from './useEffectRef';

function useInterval<T extends (...args: any[]) => void>(fn: T, delay: number, ...args: Parameters<T>) {
  const fnRef = useEffectRef<[T, ...Parameters<T>]>([fn, ...args]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (delay) {
      timerRef.current = setInterval(() => {
        fnRef.current[0]?.(...fnRef.current.slice(1));
      }, delay);
    } else {
      timerRef.current = null;
    }
  }, [delay]);
}

export default useInterval;
