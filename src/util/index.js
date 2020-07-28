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
