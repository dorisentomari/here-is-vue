import {def, isObject} from '../util/index';
import {arrayMethods} from './array';
import Dep from './dep';

class Observer {
  constructor(value) {
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
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      console.log('取值', key, value);
      // 如果当前有 watcher
      if (Dep.target) {
        dep.depend(); // 将 watcher 存储起来
      }
      return value;
    },
    set(newValue) {
      console.log('设置值', key, newValue);
      if (newValue === value) {
        return;
      }
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
