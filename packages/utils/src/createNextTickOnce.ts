import nextTick from './nextTick';

function createNextTickOnce<T extends (...args: any[]) => any>(fn: T): () => Promise<ReturnType<T>> {
  let result: ReturnType<T>;
  let done: boolean;
  return () => {
    done = false;
    return new Promise((resolve) => {
      nextTick(() => {
        if (!done) {
          result = fn?.();
          done = true;
        }
        resolve(result);
      });
    });
  };
}

export default createNextTickOnce;
