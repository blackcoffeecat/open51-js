import { simpleCallback } from '.';

function fallbackCall<T extends simpleCallback>(fn: T, ...args: Parameters<T>): ReturnType<T> | null {
  try {
    return fn(...args);
  } catch (e) {
    return null;
  }
}

export default fallbackCall;
