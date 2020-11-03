import { useEffect, useRef } from 'react';

function useMountedRef() {
  const ref = useRef(true);
  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);
  return ref;
}

export default useMountedRef;
