import {observe} from './observe/index';
import {proxy}from './util/index';

export function initState(vm) {
  const opts = vm.$options;

  if (opts.props) {
    initProps(vm);
  }

  if (opts.methods) {
    initMethod(vm);
  }

  if (opts.data) {
    initData(vm);
  }

  if (opts.computed) {
    initComputed(vm);
  }

  if (opts.watch) {
    initWatch(vm);
  }

}

function initProps(vm) {
  console.log('initProps fn', vm.$options.props);
}

function initMethod(vm) {
  console.log('initMethod fn', vm.$options.methods);
}

function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === 'function' ? data.call(vm) : data;
  vm._data = data;
  // 劫持数据对象
  observe(data);

  for (let key in data) {
    proxy(vm, '_data', key);
  }

}

function initComputed(vm) {
  console.log('initComputed fn', vm.$options.computed);
}

function initWatch(vm) {
  console.log('initWatch fn', vm.$options.watch);
}
