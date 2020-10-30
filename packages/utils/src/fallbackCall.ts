function fallbackCall<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> | null {
  try {
    return fn(...args);
  } catch (e) {
    return null;
  }
}

export default fallbackCall;
