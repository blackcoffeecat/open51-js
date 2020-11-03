import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';
import useEffectRef from '../useEffectRef';
import useUnmount from '../useUnmount';

type AsyncStatus = 'fulfilled' | 'rejected' | 'pending' | 'canceled';

function useAsync<T = any>(runner: (...args: any[]) => PromiseLike<T>) {
  type TAndNull = T | null;
  const [result, setResult] = useState<TAndNull>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('canceled');
  const runnerRef = useEffectRef(runner);
  const promiseRef: MutableRefObject<PromiseLike<T | null>> = useRef(new Promise(() => void 0));

  useUnmount(() => {
    promiseRef.current = Promise.resolve(null);
  });

  const start = useCallback(() => {
    if (typeof runnerRef.current !== 'function') return;
    setStatus('pending');
    let promise: PromiseLike<TAndNull> = runnerRef.current();
    promise = promise.then(done, fail);
    promiseRef.current = promise;

    function done(result: TAndNull) {
      if (promiseRef.current === promise) {
        setResult(result);
        setStatus('fulfilled');
      }
      return result;
    }

    function fail(error: Error) {
      if (promiseRef.current === promise) {
        setError(error);
        setStatus('rejected');
      }
      return Promise.reject(error);
    }

    return promise;
  }, []);

  const cancel = useCallback(() => {
    setResult(null);
    setError(null);
    setStatus('canceled');
    promiseRef.current = new Promise(() => void 0);
  }, []);

  return useMemo(() => ({ result, error, status, start, cancel }), [status]);
}

export default useAsync;
