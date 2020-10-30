import { useEffect, useRef } from 'react';

function useUnmount(fn: () => void) {
  const fnRef = useRef();
  useEffect(() => fnRef.current, []);
}

export default useUnmount;
