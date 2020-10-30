import { simpleCallback } from '.';
import isSyntheticEvent from './isSyntheticEvent';

type ChainHandlerScope = boolean | (() => boolean);
let scope: ChainHandlerScope = true;

export function setChainHandlerScope(nextScope) {
  let prevScope = scope;
  scope = nextScope;
  return function popChainHandlerScope() {
    scope = prevScope;
  };
}

const shouldContinue = (value) => {
  if (typeof value === 'boolean') return value;
  return true;
};

function chainHandlers<T extends simpleCallback>(...handlers: T[]): (...args: Parameters<T>) => Promise<void> {
  const fns = [].slice.call(handlers, 0);

  return async (...args: any[]) => {
    let chainedArgs = [];
    args.forEach((item) => {
      if (isSyntheticEvent(item)) item.persist();
    });

    let ret = true;
    while (fns.length) {
      if ((typeof scope === 'function' ? scope() : scope) === false) break;

      try {
        ret = await fns.shift()(...chainedArgs);
        chainedArgs = ret != null ? [ret] : [];
      } catch (e) {
        console.error(e);
        ret = false;
      }

      if (!shouldContinue(ret)) break;
    }
  };
}

export default chainHandlers;
