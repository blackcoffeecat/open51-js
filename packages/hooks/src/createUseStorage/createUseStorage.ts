import { useEffect, useMemo, useState } from 'react';
import useCall from '../useCall';
import useEffectRef from '../useEffectRef';
import fallbackCall from '@open51/utils/fallbackCall';

type storageType = 'sessionStorage' | 'localStorage';

type updateCallback<T> = (value: T) => T;

type updater<T> = T | updateCallback<T>;

function crateUseStorage<T = any>(storageKey: string, storageType: storageType = 'localStorage') {
  const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;

  // SSR compatible
  if (typeof window === 'undefined') return () => useMemo(() => [null, () => void 0], []);

  return useStorageState;

  function useStorageState() {
    const initialValue = useMemo(() => fallbackCall(JSON.parse, storage.getItem(storageKey) || 'null'), []);
    const [state, setState] = useState<T>(initialValue);
    const stateRef = useEffectRef<T>(state);

    useEffect(() => {
      const onStorage = () => {
        const json = storage.getItem(storageKey) || 'null';
        if (json === JSON.stringify(stateRef.current)) return;
        setState(fallbackCall(JSON.parse, json));
      };

      window.addEventListener('storage', onStorage);

      return () => {
        window.removeEventListener('storage', onStorage);
      };
    }, []);

    const update = useCall((value: updater<T>) => {
      let nextState = typeof value === 'function' ? (value as updateCallback<T>)(state) : value;
      localStorage.setItem(storageKey, JSON.stringify(nextState));
      setState(nextState);
    });

    return [state, update];
  }
}

export default crateUseStorage;
