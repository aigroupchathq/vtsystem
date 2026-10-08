const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\vD\\.gemini\\antigravity-ide\\brain\\e7630c91-3133-4467-ab40-6ff243ad5fcc';

const targets = [
  // 1. Executive / Centre Overview across 4 viewports
  {
    name: 'Executive Network Overview (Desktop 1440x900)',
    url: 'http://localhost:5173/?scope=NETWORK',
    width: 1440,
    height: 900,
    filename: 'network_overview_desktop_1440x900.png'
  },
  {
    name: 'Executive Network Overview (Laptop 1280x800)',
    url: 'http://localhost:5173/?scope=NETWORK',
    width: 1280,
    height: 800,
    filename: 'network_overview_laptop_1280x800.png'
  },
  {
    name: 'Executive Network Overview (Tablet 1024x768)',
    url: 'http://localhost:5173/?scope=NETWORK',
    width: 1024,
    height: 768,
    filename: 'network_overview_tablet_1024x768.png'
  },
  {
    name: 'Executive Network Overview (Mobile 390x844)',
    url: 'http://localhost:5173/?scope=NETWORK',
    width: 390,
    height: 844,
    filename: 'network_overview_mobile_390x844.png'
  },
  {
    name: 'Centre Overview - Panvel (Desktop 1440x900)',
    url: 'http://localhost:5173/?scope=CENTRE',
    width: 1440,
    height: 900,
    filename: 'centre_overview_panvel_desktop_1440x900.png'
  },

  // 2. Student 360 View across 4 viewports
  {
    name: 'Student 360 Holistic View (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=student-360&studentId=stu-kabir-deshmukh',
    width: 1440,
    height: 900,
    filename: 'student_360_desktop_1440x900.png'
  },
  {
    name: 'Student 360 Holistic View (Laptop 1280x800)',
    url: 'http://localhost:5173/?nav=student-360&studentId=stu-kabir-deshmukh',
    width: 1280,
    height: 800,
    filename: 'student_360_laptop_1280x800.png'
  },
  {
    name: 'Student 360 Holistic View (Tablet 1024x768)',
    url: 'http://localhost:5173/?nav=student-360&studentId=stu-kabir-deshmukh',
    width: 1024,
    height: 768,
    filename: 'student_360_tablet_1024x768.png'
  },
  {
    name: 'Student 360 Holistic View (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=student-360&studentId=stu-kabir-deshmukh',
    width: 390,
    height: 844,
    filename: 'student_360_mobile_390x844.png'
  },
  {
    name: 'Student 360 Parent Perspective (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=student-360&studentId=stu-kabir-deshmukh&role=parent',
    width: 390,
    height: 844,
    filename: 'student_360_parent_mobile_390x844.png'
  },

  // 3. Admissions CRM across viewports
  {
    name: 'Admissions CRM Operations (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=admissions',
    width: 1440,
    height: 900,
    filename: 'admissions_desktop_1440x900.png'
  },
  {
    name: 'Admissions CRM Operations (Tablet 1024x768)',
    url: 'http://localhost:5173/?nav=admissions',
    width: 1024,
    height: 768,
    filename: 'admissions_tablet_1024x768.png'
  },
  {
    name: 'Admissions CRM Operations (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=admissions',
    width: 390,
    height: 844,
    filename: 'admissions_mobile_390x844.png'
  },

  // 4. Academics Hub
  {
    name: 'Academics & CCE Operations (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=academics',
    width: 1440,
    height: 900,
    filename: 'academics_desktop_1440x900.png'
  },

  // 5. Attendance Hub
  {
    name: 'Attendance Hub (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=attendance',
    width: 1440,
    height: 900,
    filename: 'attendance_desktop_1440x900.png'
  },
  {
    name: 'Attendance Hub (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=attendance',
    width: 390,
    height: 844,
    filename: 'attendance_mobile_390x844.png'
  },

  // 6. Operations Hub
  {
    name: 'Operations Hub (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=operations',
    width: 1440,
    height: 900,
    filename: 'operations_desktop_1440x900.png'
  },
  {
    name: 'Operations Hub (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=operations',
    width: 390,
    height: 844,
    filename: 'operations_mobile_390x844.png'
  },

  // 7. Finance Hub
  {
    name: 'Finance Hub (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=finance',
    width: 1440,
    height: 900,
    filename: 'finance_desktop_1440x900.png'
  },
  {
    name: 'Finance Hub (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=finance',
    width: 390,
    height: 844,
    filename: 'finance_mobile_390x844.png'
  },

  // 8. Communication Hub
  {
    name: 'Communication Hub (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=communication',
    width: 1440,
    height: 900,
    filename: 'communication_desktop_1440x900.png'
  },
  {
    name: 'Communication Hub (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=communication',
    width: 390,
    height: 844,
    filename: 'communication_mobile_390x844.png'
  },

  // 9. HRMS Directory
  {
    name: 'HRMS Employee Directory (Desktop 1440x900)',
    url: 'http://localhost:5173/?nav=hrms',
    width: 1440,
    height: 900,
    filename: 'hrms_desktop_1440x900.png'
  },
  {
    name: 'HRMS Employee Directory (Mobile 390x844)',
    url: 'http://localhost:5173/?nav=hrms',
    width: 390,
    height: 844,
    filename: 'hrms_mobile_390x844.png'
  }
];

console.log('Starting Edge headless screenshot captures...\n');

for (const target of targets) {
  const localPath = path.resolve(__dirname, target.filename);
  const artifactPath = path.join(artifactDir, target.filename);

  console.log(`[Capturing] ${target.name}`);
  console.log(`URL: ${target.url} | Window: ${target.width}x${target.height}`);

  const args = [
    '--headless',
    '--disable-gpu',
    `--window-size=${target.width},${target.height}`,
    '--virtual-time-budget=4000',
    `--screenshot=${localPath}`,
    target.url
  ];

  const res = spawnSync(edgeExe, args);

  if (fs.existsSync(localPath)) {
    const size = fs.statSync(localPath).size;
    console.log(`✓ Saved locally: ${localPath} (${size} bytes)`);
    // Copy to artifact directory
    fs.copyFileSync(localPath, artifactPath);
    console.log(`✓ Copied to artifacts: ${artifactPath}\n`);
  } else {
    console.error(`✗ Failed to generate screenshot for ${target.name}`);
    if (res.stderr) console.error(res.stderr.toString());
  }
}

console.log('Screenshot capture process complete.');
