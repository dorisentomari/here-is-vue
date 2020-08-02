let callbacks = [];
let waiting = false;
let timerFunc;

function flushCallbacks() {
  callbacks.forEach(cb => cb());
}

if (Promise) {
  timerFunc = () => Promise.resolve().then(flushCallbacks);
} else if (MutationObserver) {
  let observe = new MutationObserver(flushCallbacks);
  let textNode = document.createTextNode(1);
  observe.observe(textNode, {
    characterData: true
  });

  timerFunc = () => {
    textNode.textContent = 2;
  };

} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

export function nextTick(cb) {
  callbacks.push(cb);
  timerFunc();
}
