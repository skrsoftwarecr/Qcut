const fs = require('fs');
const { execSync } = require('child_process');

try {
  console.log("Running eslint fix...");
  execSync('npx eslint . --fix');
} catch (e) {
  // eslint --fix returns 1 if there are remaining errors
}

// Now get json output
let eslintResults = [];
try {
  const output = execSync('npx eslint src/**/*.jsx src/**/*.js --format json', { encoding: 'utf-8' });
  eslintResults = JSON.parse(output);
} catch (e) {
  eslintResults = JSON.parse(e.stdout);
}

eslintResults.forEach(fileResult => {
  const messages = fileResult.messages;
  let fileContent = fs.readFileSync(fileResult.filePath, 'utf-8');
  let lines = fileContent.split('\n');
  let changed = false;

  // Reverse sort to mutate lines from bottom to top without messing up line numbers
  // wait, lines are 1-indexed, array is 0-indexed
  messages.sort((a, b) => b.line - a.line).forEach(msg => {
    if (msg.ruleId === 'unused-imports/no-unused-vars' && msg.message.includes("'error' is defined but never used")) {
      let lineIdx = msg.line - 1;
      lines[lineIdx] = lines[lineIdx].replace('catch (error)', 'catch (_err)');
      changed = true;
    }
    if (msg.ruleId === 'no-useless-assignment' && msg.message.includes("'error'")) {
      // Just a no-useless-assignment, maybe change 'error = ' to '_err = '
    }
    if (msg.ruleId === 'no-undef' && msg.message.includes("'error' is not defined")) {
       let lineIdx = msg.line - 1;
       lines[lineIdx] = lines[lineIdx].replace(/\berror\b/g, '_err');
       changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(fileResult.filePath, lines.join('\n'));
    console.log(`Fixed unused/undef error variables in ${fileResult.filePath}`);
  }
});
