import { MutableRefObject, useEffect, useRef } from 'react';
import useEffectRef from '../useEffectRef';

function useInterval<T extends (...args: any[]) => void>(fn: T, delay: number, ...args: Parameters<T>) {
  const fnRef = useEffectRef<[T, ...Parameters<T>]>([fn, ...args]);
  const timerRef: MutableRefObject<number | null | NodeJS.Timeout> = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current as NodeJS.Timeout);
    if (delay) {
      timerRef.current = setInterval(() => {
        fnRef.current?.[0]?.(...fnRef.current.slice(1));
      }, delay);
    } else {
      timerRef.current = null;
    }
  }, [delay]);
}

export default useInterval;
