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
    configurable: true,
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

export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
];

export const strategy = {};

LIFECYCLE_HOOKS.forEach(hook => {
  strategy[hook] = mergeHook;
});

function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal);   // res.__proto__ = parentVal;
  if (childVal) {
    for (let key in childVal) {
      res[key] = childVal[key];
    }
  }
  return res;
}

strategy.components = mergeAssets;

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal];
    }
  }
  return parentVal;
}

export function mergeOptions(parent, child) {
  const options = {};

  for (let key in parent) {
    mergeField(key);
  }

  for (let key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  return options;

  function mergeField(key) {
    if (strategy[key]) {
      return options[key] = strategy[key](parent[key], child[key]);
    }
    if (isPlainObject(parent[key]) && isPlainObject(child[key])) {
      options[key] = {
        ...parent[key],
        ...child[key],
      };
    } else {
      options[key] = child[key];
    }
  }
}

export function isReservedTag(tag) {
  let str = 'p,div,span,input,button,ul,li,ol';
  let obj = {};
  str.split(',').forEach(tag => {
    obj[tag] = true;
  });

  return !!obj[tag];
}

