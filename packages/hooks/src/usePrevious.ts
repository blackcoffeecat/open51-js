import { useEffect, useRef, useState } from 'react';

function usePrevious<T = any>(value: T): T {
  const ref = useRef<T>();

  const [state, update] = useState<T>();

  useEffect(() => {
    update(ref.current);
    ref.current = value;
  }, [value]);

  return state;
}

export default usePrevious;
