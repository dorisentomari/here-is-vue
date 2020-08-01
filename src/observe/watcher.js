class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.callback = callback;
    this.options = options;

    // 把内部传过来的回调函数，放在 getter 属性上
    this.getter = exprOrFn;

    this.get();
  }

  get() {
    return this.getter();
  }

}

export default Watcher;
