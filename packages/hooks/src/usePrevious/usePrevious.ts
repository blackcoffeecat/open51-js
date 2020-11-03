import { MutableRefObject, useEffect, useRef, useState } from 'react';

function usePrevious<T = any>(value?: T) {
  const ref: MutableRefObject<T | null> = useRef(null);

  const [state, update] = useState<T | null>(null);

  useEffect(() => {
    update(ref.current);
    ref.current = value ?? null;
  }, [value]);

  return state;
}

export default usePrevious;
