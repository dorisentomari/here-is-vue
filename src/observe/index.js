import {def, isObject} from '../util/index';
import {arrayMethods} from './array';
import Dep from './dep';

class Observer {
  constructor(value) {
    this.dep = new Dep();
    if (Array.isArray(value)) {
      def(value, '__ob__', this);
      value.__proto__ = arrayMethods;
      this.observerArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(data) {
    let keys = Object.keys(data);
    keys.forEach(key => {
      let value = data[key];
      defineReactive(data, key, value);
    });
  }

  observerArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }

}

function defineReactive(data, key, value) {
  let dep = new Dep();
  let childObserve = observe(value);
  Object.defineProperty(data, key, {
    get() {
      // 如果当前有 watcher
      if (Dep.target) {
        dep.depend(); // 将 watcher 存储起来
        if (childObserve) {
          childObserve.dep.depend();
          // 如果数组中还有数组
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      observe(newValue);
      value = newValue;
      dep.notify(); // 通知依赖的 watcher 进行更新操作
    }
  });
}

export function observe(data) {
  if (!isObject(data)) {
    return;
  }
  return new Observer(data);
}

function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let current = value[i];
    current.__ob__ && current.__ob__.dep.depend();
    if (Array.isArray(current)) {
      dependArray(current);
    }
  }
}
