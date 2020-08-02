import {isObject, isReservedTag} from '../util/index';

export function createElement(vm, tag, data = {}, ...children) {
  let key = data.key;
  if (key) {
    delete data.key;
  }
  if (isReservedTag(tag)) {
    return vnode(tag, data, key, children, undefined);
  }
  let Ctor = vm.$options.components[tag];
  return createComponent(vm, tag, data, key, children, Ctor);
}

function createComponent(vm, tag, data, key, children, Ctor) {
  const baseCtor = vm.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  data.hook = {
    init(vnode) {
      let child = vnode.componentInstance =  new Ctor({_isComponent: true});
      child.$mount();

    },

    inserted() {

    }
  };

  return vnode(`vue-component-${Ctor.cid}-${tag}`, data, key, children, undefined, {Ctor, children});
}


export function createTextNode(vm, text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}

function vnode(tag, data, key, children, text, componentOptions) {
  return {
    tag,
    data,
    key,
    children,
    text,
    componentOptions
  };
}
