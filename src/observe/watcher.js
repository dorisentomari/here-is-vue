import {popTarget, pushTarget} from './dep.js';
import {queueWatcher} from './schedular';

let id = 0;

class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.callback = callback;
    this.options = options;
    this.id = id++;
    this.depsId = new Set();
    this.deps = [];
    // 把内部传过来的回调函数，放在 getter 属性上
    this.getter = exprOrFn;

    this.get();
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }

  update() {
    // this.get();
    queueWatcher(this);
  }

  run() {
    this.get();
  }
}

export default Watcher;
