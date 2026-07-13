const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'pages', 'Settings.jsx');
const text = fs.readFileSync(filePath, 'utf8');
const start = text.indexOf('return (');
if (start === -1) {
  console.error('return start not found');
  process.exit(1);
}
const part = text.slice(start);
const regex = /<(\/)?([A-Za-z][A-Za-z0-9]*)([^>]*)>/g;
const selfClosing = new Set(['br','img','input','hr','meta','link','path','rect','circle','ellipse','stop','polyline','polygon','line','source','track','area','col','colgroup','embed','param','wbr','base','command','keygen']);
let stack = [];
let m;
let line = text.slice(0, start).split('\n').length;
while ((m = regex.exec(part))) {
  const isClosing = m[1] === '/';
  const tag = m[2];
  const attrs = m[3] || '';
  const selfClose = attrs.trim().endsWith('/') || selfClosing.has(tag.toLowerCase());
  const before = part.slice(0, m.index);
  const currentLine = line + (before.match(/\n/g) || []).length;
  if (selfClose) continue;
  if (isClosing) {
    if (stack.length && stack[stack.length-1].tag === tag) {
      stack.pop();
    } else {
      console.error('Mismatch closing', tag, 'line', currentLine, 'stack top', stack.slice(-10));
      process.exit(1);
    }
  } else {
    stack.push({tag, line: currentLine});
  }
}
console.log('remaining stack length', stack.length);
console.log(stack.slice(-20));
