function isPromise(value: any) {
  return !!value && typeof value.promise === 'function';
}

export default isPromise;
