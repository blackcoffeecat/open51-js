import { EffectCallback, useEffect } from 'react';
import useEffectRef from '../useEffectRef';

function useUnmount(fn: ReturnType<EffectCallback>) {
  const fnRef = useEffectRef(fn);
  useEffect(() => fnRef.current || void 0, []);
}

export default useUnmount;
