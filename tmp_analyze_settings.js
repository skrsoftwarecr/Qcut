const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'pages', 'Settings.jsx');
const text = fs.readFileSync(file, 'utf8');
const formStart = text.indexOf('<form onSubmit={handleSave} className="space-y-6">');
if (formStart === -1) {
  console.error('Form start not found');
  process.exit(1);
}
const part = text.slice(formStart);
const regex = /<(\/)?([A-Za-z][A-Za-z0-9]*)([^>]*)>/g;
const self = new Set(['br','img','input','hr','meta','link','path','rect','circle','ellipse','stop','polyline','polygon','line','source','track','area','col','colgroup','embed','param','wbr','base','command','keygen']);
let stack = [];
let m;
let lineOffset = text.slice(0, formStart).split('\n').length;
while ((m = regex.exec(part))) {
  const closing = m[1] === '/';
  const tag = m[2];
  const attrs = m[3] || '';
  const selfclose = attrs.trim().endsWith('/');
  const lineNumber = lineOffset + part.slice(0, m.index).split('\n').length;
  if (self.has(tag.toLowerCase()) || selfclose) continue;
  if (closing) {
    if (stack.length && stack[stack.length - 1].tag === tag) {
      stack.pop();
    } else {
      console.error('Mismatch closing', tag, 'at line', lineNumber, 'stack top', stack.slice(-10));
      process.exit(1);
    }
  } else {
    stack.push({tag, line: lineNumber});
  }
}
console.log('remaining stack length', stack.length);
console.log(stack.slice(-20));
