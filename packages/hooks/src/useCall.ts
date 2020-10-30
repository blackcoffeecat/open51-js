import { useCallback, useRef } from 'react';
import useMountedRef from './useMountedRef';
import { setChainHandlerScope } from '@open51/utils/chainHandlers';
import isPromise from '@open51/utils/isPromise';

function useCall<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef<T>();
  const mountedRef = useMountedRef();
  fnRef.current = fn;

  return useCallback((...args: Parameters<T>) => {
    const refFn = fnRef.current;

    const popScope = setChainHandlerScope(() => mountedRef.current);

    try {
      let ret = refFn(...args);
      if (isPromise(ret)) {
        ret = ret.finally(popScope);
      } else {
        popScope();
      }
      return ret;
    } catch (e) {
      popScope();
      throw e;
    }
  }, []);
}

export default useCall;
