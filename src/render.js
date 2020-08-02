import {createElement, createTextNode} from './vdom/createElement';

export function renderMixin(Vue) {
  Vue.prototype._c = function () {
    return createElement(this,...arguments);
  };

  Vue.prototype._v = function (text) {
    return createTextNode(this,text);
  };

  Vue.prototype._s = function (text) {
    if (typeof text === 'object' && text !== null) {
      return JSON.stringify(text);
    } else if (typeof text === 'string') {
      return text;
    }
    return '';
  };


  Vue.prototype._render = function () {
    const vm = this;
    const {render} = vm.$options;

    let vnode = render.call(vm);
    return vnode;
  };
}
