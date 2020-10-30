import { simpleCallback } from './';
import nextTick from './nextTick';

function createNextTickOnce<T extends simpleCallback>(fn: T): () => Promise<ReturnType<T>> {
  let result;
  let done;
  return () => {
    done = false;
    result = null;
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
