const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\vD\\.gemini\\antigravity-ide\\brain\\e7630c91-3133-4467-ab40-6ff243ad5fcc';

const targets = [
  {
    name: 'Academics & CCE Operations (Tablet 1024x768)',
    url: 'http://localhost:5173/?nav=academics',
    width: 1024,
    height: 768,
    filename: 'academics_tablet_1024x768.png'
  },
  {
    name: 'Academics & CCE Operations (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=academics',
    width: 390,
    height: 844,
    filename: 'academics_mobile_390x844.png'
  }
];

for (const target of targets) {
  const localPath = path.resolve(__dirname, target.filename);
  const artifactPath = path.join(artifactDir, target.filename);

  console.log(`[Capturing] ${target.name}`);
  const args = [
    '--headless',
    '--disable-gpu',
    `--window-size=${target.width},${target.height}`,
    '--virtual-time-budget=4000',
    `--screenshot=${localPath}`,
    target.url
  ];

  spawnSync(edgeExe, args);
  if (fs.existsSync(localPath)) {
    fs.copyFileSync(localPath, artifactPath);
    console.log(`✓ Updated: ${target.filename}`);
  }
}
