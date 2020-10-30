function forkHandlers<T extends (...args: any[]) => any>(...handlers: Function[]) {
  const fns: T[] = [].slice.call(handlers, 0);
  return (...args: Parameters<T>) => {
    while (fns.length) {
      try {
        fns.shift()?.(...args);
      } catch (e) {
        console.error(e);
      }
    }
  };
}

export default forkHandlers;
