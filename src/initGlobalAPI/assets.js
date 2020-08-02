import {ASSETS_TYPE} from './const';

export default function initAssetRegisters(Vue) {
  for (let i = 0; i < ASSETS_TYPE.length; i++) {
    const type = ASSETS_TYPE[i];
    Vue[ASSETS_TYPE[i]] = function (id, definition) {
      if (type === 'component') {
        definition.name = definition.name || id;
        // 使用 extend 方法，将对象变成构造函数
        definition = this.options._base.extend(definition);
        this.options['components'][id] = definition;
      } else if (type === 'filter') {


      } else if (type === 'directive') {

      }
      this.options[type + 's'][id] = definition;
    };
  }
}
