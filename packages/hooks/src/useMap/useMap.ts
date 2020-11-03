import { useCallback, useState } from 'react';

function useMap<K = string, V = any>(): [Map<K, V>, (key: K, value: V) => void, () => void] {
  const [state, setState] = useState<Map<K, V>>(new Map());

  const set = useCallback((key, value) => {
    setState((prevState) => new Map(prevState).set(key, value));
  }, []);

  const clear = useCallback(() => {
    setState(new Map());
  }, []);

  return [state, set, clear];
}

export default useMap;
