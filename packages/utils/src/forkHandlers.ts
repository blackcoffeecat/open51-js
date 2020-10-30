import { simpleCallback } from '.';

function forkHandlers<T extends simpleCallback>(...handlers: Function[]) {
  const fns = [].slice.call(handlers, 0);
  return (...args: Parameters<T>) => {
    while (fns.length) {
      try {
        fns.shift(...args);
      } catch (e) {
        console.error(e);
      }
    }
  };
}

export default forkHandlers;
