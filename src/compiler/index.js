import {defaultTagRE, parseHTML} from './parseHTML';

function genProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name.toUpperCase() === 'STYLE') {
      let obj = {};
      attr.value.split(';').filter(Boolean).forEach(item => {
        let [key, value] = item.split(':');
        obj[key.trim()] = value.trim();
      });
      attr.value = obj;
    }
    str += `"${attr.name}":${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}

function gen(node) {
  if (node.type === 1) {
    return generate(node);
  } else {
    let text = node.text;
    let tokens = [];
    let match, index;
    let lastIndex = defaultTagRE.lastIndex = 0;
    while (match = defaultTagRE.exec(text)) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join('+')})`;
  }
}

function genChildren(el) {
  let children = el.children;
  if (children && children.length > 0) {
    return `${children.map(child => gen(child)).join(',')}`;
  } else {
    return false;
  }
}

function generate(el) {
  let children = genChildren(el);
  let code = `_c("${el.tag}", ${el.attrs.length > 0 ? genProps(el.attrs) : 'undefined'},
    ${children ? `${children}` : ''})`;
  return code;
}

export function compileToFunction(template) {
  let root = parseHTML(template);
  let code = generate(root);
  return new Function(`with(this){return ${code}}`);
}
