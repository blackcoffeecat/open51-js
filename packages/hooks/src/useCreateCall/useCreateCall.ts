import useMountedRef from '../useMountedRef';
import { useCallback, useRef } from 'react';
import { setChainHandlerScope } from '@open51/utils/chainHandlers';
import isPromise from '@open51/utils/isPromise';

function useCreateCall() {
  const mountedRef = useMountedRef();
  const fnRef = useRef<{ [index: string]: unknown }>({});
  const callRef = useRef<{ [index: string]: unknown }>({});

  return useCallback(<T extends (...args: any[]) => any>(key: string, fn: T) => {
    fnRef.current[key] = fn;
    if (!callRef.current[key]) {
      callRef.current[key] = (...args: Parameters<T>) => {
        const popScope = setChainHandlerScope(() => mountedRef.current);
        try {
          let ret = (fnRef.current[key] as T)?.(...args);
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
      };
    }
    return callRef.current[key] as T;
  }, []);
}

export default useCreateCall;
