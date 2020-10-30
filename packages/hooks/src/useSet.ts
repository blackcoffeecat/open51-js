import { useMemo, useState } from 'react';

interface SetMisc<T> {
  add(value: T): void;
  delete(value: T): boolean;
  clear(): void;
  from(values: Iterable<T>): void;
}

function useSet<T = any>(): [Set<T>, SetMisc<T>] {
  const [state, setState] = useState<Set<T>>(new Set());

  const misc = useMemo(
    () => ({
      add(value) {
        setState((prevState) => new Set(prevState).add(value));
      },
      delete(value) {
        let ret;
        setState((prevState) => {
          const newState = new Set(prevState);
          ret = newState.delete(value);
          return newState;
        });
        return ret;
      },
      clear() {
        setState(new Set());
      },
      from(values) {
        setState(new Set(values));
      },
    }),
    [],
  );

  return [state, misc];
}

export default useSet;
