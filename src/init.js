import {initState} from './state';
import {compileToFunction} from './compiler/index';
import {mountComponent} from './lifeCycle';

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    console.log('initMixin');
    // 初始化状态
    initState(vm);

    // 渲染页面
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }

      options.render = compileToFunction(template);
    }
    // 渲染挂载组件
    mountComponent(vm, el);

  };

}
