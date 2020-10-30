import { MutableRefObject, RefObject, useEffect, useRef } from 'react';

function useEffectRef<T>(value?: T): RefObject<T | null> {
  const ref: MutableRefObject<T | null> = useRef(value ?? null);
  useEffect(() => {
    ref.current = value ?? null;
  }, [value]);

  return ref;
}

export default useEffectRef;
