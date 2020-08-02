import {initMixin} from './mixin';
import initAssetRegisters from './assets';
import initExtend from './extend';
import {ASSETS_TYPE} from './const';

export function initGlobalAPI(Vue) {
  Vue.options = {};

  initMixin(Vue);

  for (let i = 0; i < ASSETS_TYPE.length; i++) {
    Vue.options[ASSETS_TYPE[i] + 's'] = {};
  }

  // _base 是 Vue 的构造函数
  Vue.options._base = Vue;

  initAssetRegisters(Vue);

  initExtend(Vue);

}
