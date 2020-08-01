const toString = Object.prototype.toString;

export function isPlainObject(obj) {
  return toString.call(obj) === '[object Object]';
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  });
}


export function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    }
  });
}
