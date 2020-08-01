import Watcher from './observe/watcher';
import {patch} from './vdom/patch';

export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el;

  console.log('vm');
  console.log(vm);
  // 渲染页面和更新页面
  let updateComponent = () => {
    // 返回虚拟 dom
    vm._update(vm._render());

  };

  // 依靠渲染 watcher，每一个组件都有一个 watcher
  // true 表示是一个渲染 watcher
  new Watcher(vm, updateComponent, () => {
  }, true);

}

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    console.log('lifeCycleMixin');
    const vm = this;
    // 用虚拟界定创建出真实节点，替换掉真实的 $el
    vm.$el = patch(vm.$el, vnode);

  };
}
