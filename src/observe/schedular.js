import {nextTick} from '../util/nextTick';

let queue = [];
let has = {};

function flashSchedularQueue() {
  queue.forEach(watcher => watcher.run());
  queue = [];
  has = {};
}

let pending = false;

export function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;
    if (!pending) {
      nextTick(flashSchedularQueue);
      pending = true;
    }
  }
}
