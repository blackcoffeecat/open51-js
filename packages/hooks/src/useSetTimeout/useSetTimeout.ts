import { useCallback, useRef } from 'react';
import useUnmount from '../useUnmount';

function useSetTimeout() {
  const timerRef = useRef<any>();
  useUnmount(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  });

  return useCallback((fn: Function, delay?: number, ...args: any[]) => {
    const timer = setTimeout(fn, delay, ...args);
    timerRef.current = timer;
    return () => {
      if (timerRef.current === timer) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
}

export default useSetTimeout;
