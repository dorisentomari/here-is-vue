export function patch(oldVnode, vnode) {
  // 递归创建真实节点，替换老的节点
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    const oldElm = oldVnode;  // 'div id=app'
    const parentElm = oldElm.parentNode;  // body
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldVnode);
    return el;
  }
}

function createComponent(vnode) {
  let i = vnode.data;
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  console.log('createComponent vnode', vnode);
}

// 根据虚拟节点创建真实节点
function createElm(vnode) {
  let {tag, data, key, children, text} = vnode;
  if (typeof tag === 'string') {
    if (createComponent(vnode)) {
      return;
    }


    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.map(child => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;

  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps[key]) {
        el.style[styleName] = newProps[key][styleName];
      }
    } else if (key === 'class') {
      el.className = newProps[key];
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}
