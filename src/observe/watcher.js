import {popTarget, pushTarget} from './dep.js';

let id = 0;

class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.callback = callback;
    this.options = options;
    this.id = id++;

    // 把内部传过来的回调函数，放在 getter 属性上
    this.getter = exprOrFn;

    this.get();
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }

  update() {
    this.get();
  }

}

export default Watcher;
