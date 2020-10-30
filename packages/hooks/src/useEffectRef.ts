import { RefObject, useEffect, useRef } from 'react';

function useEffectRef<T>(value): RefObject<T> {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

export default useEffectRef;
