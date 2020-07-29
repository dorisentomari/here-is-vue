import {parseHTML} from "./parseHTML";

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

function generate(el) {
  let code = `_c("${el.tag}", ${el.attrs.length > 0 ? genProps(el.attrs) : ''})`;

  return code;
}

export function compileToFunction(template) {
  let root = parseHTML(template);
  console.log('root', root);

  let code = generate(root);
  console.log('code', code);
  return function render() {

  }

}
