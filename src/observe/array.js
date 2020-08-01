let oldArrayMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayMethods);

const methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'reverse',
  'sort',
  'splice'
];

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    oldArrayMethods[method].apply(this, args);
    let inserted;
    const ob = this.__ob__;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
      default:
        break;
    }
    if(inserted) {
      ob.observerArray(inserted);
    }
  };
});
