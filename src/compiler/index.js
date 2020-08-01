import {parseHTML} from './parseHTML';
import {generate} from './generate';

export function compileToFunction(template) {
  let root = parseHTML(template);
  let code = generate(root);
  return new Function(`with(this){return ${code}}`);
}
