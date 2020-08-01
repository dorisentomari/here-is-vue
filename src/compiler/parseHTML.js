// 匹配类似 abc-abc 的字符串
const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*';
// ?: 匹配不捕获
// 匹配 <aaa:abc> 里的 aaa:abc
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
export const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

// ast 语法树的根
let root = null;
// 当前元素的父结点
let currentParent = null;

let stack = [];
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    attrs,
    type: ELEMENT_TYPE,
    children: [],
    parent: null
  };
}

function start(tagName, attrs) {
  let element = createASTElement(tagName, attrs);
  if (!root) {
    root = element;
  }
  currentParent = element;
  stack.push(element);
}

function chars(text) {
  text = text.replace(/\s/g, '');
  if (text) {
    currentParent.children.push({
      text,
      type: TEXT_TYPE
    });
  }
}

function end(tagName) {
  let element = stack.pop();
  currentParent = stack[stack.length - 1];
  if (currentParent) {
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}

export function parseHTML(html) {
  while (html) {
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      let startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }

    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }

    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  return root;
  function advance(n) {
    html = html.substring(n);
  }

  function parseStartTag() {
    let start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      };
      advance(start[0].length);
      let end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]});
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }
}
