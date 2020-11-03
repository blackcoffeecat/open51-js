import { EffectCallback, useEffect, useRef } from 'react';

function useMountEffect<T extends (...args: any[]) => ReturnType<EffectCallback>>(fn: T, ...args: Parameters<T>) {
  const mount = useRef(false);
  const ret = useRef<ReturnType<EffectCallback>>();

  if (!mount.current) {
    ret.current = fn(...args);
    mount.current = true;
  }

  useEffect(() => ret.current, []);
}

export default useMountEffect;
