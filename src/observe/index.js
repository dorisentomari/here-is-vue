import {isObject, def} from "../util/index";
import {arrayMethods} from './array';


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
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      console.log('更新数据', key, value, newValue);
      if (newValue === value) {
        return;
      }
      value = newValue;
    }
  })
}


export function observe(data) {
  if (!isObject(data)) {
    return;
  }
  return new Observer(data);
}
