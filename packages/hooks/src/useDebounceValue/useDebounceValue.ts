import { useEffect, useState } from 'react';
import useSetTimeout from '../useSetTimeout';

function useDebounceValue<T>(value: T, delay: number = 200) {
  const setTimeout = useSetTimeout();
  const [state, update] = useState(value);

  useEffect(() => setTimeout(update, delay, value), [value]);

  return state;
}

export default useDebounceValue;
