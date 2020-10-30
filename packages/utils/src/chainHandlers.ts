import isSyntheticEvent from './isSyntheticEvent';

type ChainHandlerScope = boolean | (() => boolean);
let scope: ChainHandlerScope = true;

export function setChainHandlerScope(nextScope: ChainHandlerScope) {
  let prevScope = scope;
  scope = nextScope;
  return function popChainHandlerScope() {
    scope = prevScope;
  };
}

const shouldContinue = (value: any) => {
  if (typeof value === 'boolean') return value;
  return true;
};

function chainHandlers<T extends (...args: any[]) => any>(...handlers: T[]): (...args: Parameters<T>) => Promise<void> {
  const fns: T[] = [].slice.call(handlers, 0);

  return async (...args: Parameters<T>) => {
    args.forEach((item) => {
      if (isSyntheticEvent(item)) item.persist();
    });

    let ret = true;
    while (fns.length) {
      if ((typeof scope === 'function' ? scope() : scope) === false) break;

      try {
        ret = await fns.shift()?.(...args);
      } catch (e) {
        console.error(e);
        ret = false;
      }

      if (!shouldContinue(ret)) break;
    }
  };
}

export default chainHandlers;
