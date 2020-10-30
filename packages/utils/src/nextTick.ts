function nextTick<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): Promise<ReturnType<T>> {
  return Promise.resolve().then(() => fn(...args));
}

export default nextTick;
