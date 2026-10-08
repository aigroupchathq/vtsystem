const { spawnSync } = require('child_process');
const fs = require('fs');

const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const res = spawnSync(edgeExe, [
  '--headless',
  '--disable-gpu',
  '--enable-logging',
  '--v=1',
  'http://localhost:5173/?scope=CENTRE'
]);

console.log('STDOUT:', res.stdout.toString().substring(0, 500));
console.log('STDERR:', res.stderr.toString().substring(0, 500));
