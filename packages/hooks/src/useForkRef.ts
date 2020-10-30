import { RefCallback, RefObject, useCallback } from 'react';
import isRefObject from '@open51/utils/isRefObject';

type AnyRef<T> = RefObject<T> | RefCallback<T>;
const doRef = <T = any>(instance: T, ref: AnyRef<T>) => {
  if (typeof ref === 'function') {
    (ref as RefCallback<T>)(instance);
  }
  if (isRefObject(ref)) {
    // @ts-ignore
    (ref as RefObject<T>).current = instance;
  }
};

function useForkRef<T = any>(refA: AnyRef<T>, refB: AnyRef<T>): RefCallback<T> {
  return useCallback((instance) => {
    doRef(instance, refA);
    doRef(instance, refB);
  }, []);
}

export default useForkRef;
