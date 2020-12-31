import { nextTick } from './index';

export type RunningTask = Promise<any>;

class Until {
  public readonly tasks: RunningTask[] = [];

  add(task: RunningTask) {
    this.tasks.push(task);
    task.finally(() => {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    });
  }

  wait() {
    return nextTick(() => Promise.all(this.tasks.slice()));
  }
}

export default Until;
