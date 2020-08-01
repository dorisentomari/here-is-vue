import Watcher from './observe/watcher';
import {patch} from './vdom/patch';

export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el;

  callHook(vm, 'beforeMount');
  // 渲染页面和更新页面
  let updateComponent = () => {
    // 返回虚拟 dom
    vm._update(vm._render());

  };

  // 依靠渲染 watcher，每一个组件都有一个 watcher
  // true 表示是一个渲染 watcher
  new Watcher(vm, updateComponent, () => {
  }, true);
  callHook(vm, 'mounted');
}

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 用虚拟界定创建出真实节点，替换掉真实的 $el
    vm.$el = patch(vm.$el, vnode);

  };
}

export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}
