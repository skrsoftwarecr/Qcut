const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join(__dirname, 'src', 'pages', 'Settings.jsx'), 'utf8').split(/\r?\n/);
const start = 420;
const end = 720;
for (let i = start; i < end && i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
