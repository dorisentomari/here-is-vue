import { initState } from './state';

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log('_init 初始化流程', options);
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm);

    // 渲染页面

  }
}
