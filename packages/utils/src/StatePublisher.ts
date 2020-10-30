import createNextTickOnce from './createNextTickOnce';

export type IsEqualState<T = any> = (prevState: T, nextState: T) => boolean;

export type StatePublisherMode = 'immediate' | 'nextTick';

export type StatePublisherCallback<T> = (value: T) => void;

class StatePublisher<T = any> {
  static IMMEDIATE = 'immediate';

  static NEXT_TICK = 'nextTick';

  readonly isEqualState: IsEqualState = () => false;

  readonly callbacks: StatePublisherCallback<T>[] = [];

  private __state: T = null;

  get state() {
    return this.__state;
  }

  mode: StatePublisherMode;

  constructor(isEqualState?: IsEqualState, mode?: StatePublisherMode) {
    this.isEqualState = isEqualState ?? (() => true);
    this.mode = mode ?? 'nextTick';
  }

  subscribe(fn: StatePublisherCallback<T>) {
    this.callbacks.push(fn);
    return () => {
      this.callbacks.splice(this.callbacks.indexOf(fn), 1);
    };
  }

  update(nextState) {
    if (this.isEqualState(this.state, nextState)) return;
    this.__state = nextState;
    if (this.mode === 'nextTick') {
      this.publishOnce();
    } else {
      this.publish();
    }
  }

  private publish = () => {
    const callbacks = this.callbacks.slice(0);
    const state = this.state;
    while (callbacks.length) {
      try {
        callbacks.shift()(state);
      } catch (e) {
        console.error(e);
      }
    }
  };

  private publishOnce = createNextTickOnce(this.publish);
}

export default StatePublisher;
