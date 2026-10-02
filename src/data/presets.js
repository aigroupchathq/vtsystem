export const SAAS_PRESETS = [
  {
    id: 'saas-foundry',
    name: 'SaaS Core Engine',
    tagline: 'Autonomous Multi-Tenant Architecture, Auth & Stripe Webhooks',
    category: 'Autonomous SaaS Foundation',
    icon: 'Layers',
    prd: `# SaaS Core Engine - Product Requirements Document

## 1. Executive Summary
An autonomous, production-grade foundation for modern SaaS applications. Provides instant multi-tenant database isolation, JWT-based role authentication, automated Stripe subscription billing, and programmatic API routing out of the box.

## 2. Target Users
Independent founders, technical creators, and agile teams looking to launch subscription web applications without rebuilding boilerplate auth and billing.

## 3. Core Architecture
- Multi-tenant tenantId scoping across all database queries.
- Stripe webhook idempotency table preventing double-charging.
- Automated OpenAPI/Swagger schema documentation generation.
- Sub-50ms edge caching for high-traffic public landing pages.`,
    schema: `// schema.prisma - Multi-Tenant SaaS Core
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Organization {
  id            String    @id @default(uuid())
  name          String
  slug          String    @unique
  stripeCustomerId String?
  subscriptionTier String  @default("STARTER")
  createdAt     DateTime  @default(now())

  users         User[]
  apiKeys       ApiKey[]
}

model User {
  id            String       @id @default(uuid())
  email         String       @unique
  role          String       @default("MEMBER")
  organizationId String
  organization  Organization @relation(fields: [organizationId], references: [id])
}

model ApiKey {
  id            String       @id @default(uuid())
  keyHash       String       @unique
  organizationId String
  organization  Organization @relation(fields: [organizationId], references: [id])
  lastUsedAt    DateTime?
}`,
    tasks: [
      { id: 'S-101', title: 'Compile multi-tenant PostgreSQL schema with organization isolation', status: 'done', mode: 'Planner', tests: '6/6 passed', duration: '1.1m' },
      { id: 'S-102', title: 'Generate Stripe webhook event listener with idempotency verification', status: 'done', mode: 'Builder', tests: '8/8 passed', duration: '2.2m' },
      { id: 'S-103', title: 'Scaffold JWT role-based access middleware with edge verification', status: 'done', mode: 'Builder', tests: '12/12 passed', duration: '2.8m' },
      { id: 'S-104', title: 'Deploy rate-limited API gateway endpoints with health probes', status: 'in-progress', mode: 'Builder', tests: 'Testing', duration: 'Running' },
      { id: 'S-105', title: 'Assemble edge landing pages and programmatic documentation', status: 'queued', mode: 'Planner', tests: 'Queued', duration: '-' }
    ],
    seoMatrix: {
      seed: "Scalable SaaS Architecture for {Industry} in {Region}",
      industries: ["Fintech", "HealthTech", "Logistics", "EdTech", "E-Commerce"],
      regions: ["North America", "Europe", "APAC", "Global"],
      generatedCount: 20,
      sampleUrls: [
        "/solutions/scalable-saas-architecture-for-fintech-in-north-america",
        "/solutions/scalable-saas-architecture-for-healthtech-in-europe"
      ]
    }
  },
  {
    id: 'aquaveda-water',
    name: 'Case Study: AquaVeda (Earth Telemetry)',
    tagline: 'Autonomous AI Leak Detection, Agro-Drip Optimization & Groundwater Telemetry',
    category: 'Environmental Case Study',
    icon: 'Droplets',
    prd: `# AquaVeda - Earth Water Conservation Product Requirements

## 1. Executive Mission
Water is life. Over 30% of treated municipal water is lost through underground infrastructure leaks before reaching human taps, and 60% of agricultural water is wasted due to uncalibrated flood irrigation. AquaVeda is a proven, autonomous telemetry platform that monitors flow sensors, acoustic pipe vibrations, and satellite soil moisture to prevent water waste at industrial scale.

## 2. Target Beneficiaries & Users
- Municipal water utilities aiming for zero Non-Revenue Water (NRW).
- Farmers and agricultural cooperatives transitioning to precision sub-surface drip irrigation.
- Industrial plants striving for 100% closed-loop circular water recycling.

## 3. Real-World Environmental Impact
- Proved 42% reduction in irrigation water usage via predictive evapotranspiration models.
- Immediate acoustic detection of micro-fractures in pipes, saving an estimated 1.2M gallons/day per municipal zone.
- Continuous aquifer depth monitoring and artificial recharge scheduling.

## 4. Key Engineering Guardrails
- Low-bandwidth LoRaWAN sensor ingestion running at edge stations with solar backup.
- Anomaly detection algorithms alerting utility engineers within 120 seconds of pipe pressure drop.
- Open-access public water clarity and aquifer health dashboard.`,
    schema: `// schema.prisma - AquaVeda Environmental Architecture
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model WaterZone {
  id              String         @id @default(uuid())
  name            String
  region          String
  aquiferDepthM   Float
  dailySavedLiters Float         @default(0)
  createdAt       DateTime       @default(now())
  
  sensors         SensorNode[]
  leakAlerts      LeakIncident[]
  irrigationSchedules IrrigationPlan[]
}

model SensorNode {
  id              String      @id @default(uuid())
  zoneId          String
  type            String      // ACOUSTIC_PIPE, SOIL_MOISTURE, FLOW_METER, PH_PURITY
  flowRateLps     Float       // Liters per second
  pressurePsi     Float
  batteryPct      Int
  lastPing        DateTime    @default(now())
  zone            WaterZone   @relation(fields: [zoneId], references: [id])
}

model LeakIncident {
  id              String      @id @default(uuid())
  zoneId          String
  severity        String      // CRITICAL_RUPTURE, MICRO_FRACTURE, VALVE_WEEP
  estimatedLossLph Float     // Liters per hour
  isResolved      Boolean     @default(false)
  timestamp       DateTime    @default(now())
  zone            WaterZone   @relation(fields: [zoneId], references: [id])
}

model IrrigationPlan {
  id              String      @id @default(uuid())
  zoneId          String
  targetCrop      String
  recommendedMl   Float
  weatherAdjusted Boolean     @default(true)
  scheduledAt     DateTime
  zone            WaterZone   @relation(fields: [zoneId], references: [id])
}`,
    tasks: [
      { id: 'W-101', title: 'Acoustic Pipe Vibration Anomaly Detector (Wavelet Filter)', status: 'done', mode: 'Planner', tests: '6/6 passed', duration: '1.2m' },
      { id: 'W-102', title: 'Solar LoRaWAN Edge Gateway Ingestion Endpoint', status: 'done', mode: 'Builder', tests: '10/10 passed', duration: '2.5m' },
      { id: 'W-103', title: 'Sub-surface Soil Moisture Evapotranspiration Algorithm', status: 'done', mode: 'Builder', tests: '14/14 passed', duration: '3.0m' },
      { id: 'W-104', title: 'Municipal Leak Heatmap & Emergency SMS Dispatcher', status: 'in-progress', mode: 'Builder', tests: 'Testing', duration: 'Running' },
      { id: 'W-105', title: 'Public Aquifer Health & Conservation Ledger', status: 'queued', mode: 'Planner', tests: 'Unexecuted', duration: '-' }
    ],
    seoMatrix: {
      seed: "Proven Water Conservation Solutions for {Industry} in {Region}",
      industries: ["Agriculture", "Municipal Cities", "Industrial Facilities", "Commercial Real Estate", "Schools & Campuses"],
      regions: ["California", "India (Deccan Plateau)", "Mediterranean", "Middle East", "Australia"],
      generatedCount: 25,
      sampleUrls: [
        "/impact/proven-water-conservation-solutions-for-agriculture-in-california",
        "/impact/proven-water-conservation-solutions-for-municipal-cities-in-india"
      ]
    }
  },
  {
    id: 'hyper-seo',
    name: 'HyperSEO Studio',
    tagline: 'Autonomous Programmatic SEO & Content Vector Engine',
    category: 'B2B Distribution & Growth',
    icon: 'TrendingUp',
    prd: `# HyperSEO Studio - Product Requirements Document\n\nProgrammatic SEO and distribution engine turning high-intent keyword recipes into thousands of indexable landing pages with dynamic OpenGraph cards.`,
    schema: `model Tenant {\n  id    String @id @default(uuid())\n  name  String\n}`,
    tasks: [
      { id: 'T-101', title: 'Initialize isolated multi-tenant PostgreSQL schema', status: 'done', mode: 'Planner', tests: '5/5 passed', duration: '1.2m' },
      { id: 'T-102', title: 'Stripe Webhook Handler & Tier Sync', status: 'done', mode: 'Builder', tests: '8/8 passed', duration: '2.4m' },
      { id: 'T-103', title: 'Programmatic Keyword Permutation Engine', status: 'done', mode: 'Builder', tests: '12/12 passed', duration: '3.1m' }
    ],
    seoMatrix: {
      seed: "AI Analytics for {Industry} in {Region}",
      industries: ["Fintech", "HealthTech", "E-Commerce", "SaaS"],
      regions: ["North America", "Europe", "APAC", "Global"],
      generatedCount: 16,
      sampleUrls: ["/solutions/ai-analytics-for-fintech-in-north-america"]
    }
  }
];

export const INITIAL_TERMINAL_LOGS = [
  { time: '23:30:14', level: 'BRAMHA', text: 'Bramha Creation Core v3.0 awakened. Harmonizing with Earth telemetry.' },
  { time: '23:30:15', level: 'IMPACT', text: 'AquaVeda active: 1,420,000 Liters of water saved across 12 zones today.' },
  { time: '23:30:18', level: 'PLAN', text: 'Demystified concept: Raw human thought mapped to 5 atomic engineering parts.' },
  { time: '23:30:22', level: 'BUILD', text: 'Acoustic pipe leak detector compiled with zero human coordination tax.' },
  { time: '23:30:31', level: 'TEST', text: 'Ran automated test crucible: 14/14 passed without meetings or committees.' },
  { time: '23:30:38', level: 'GROWTH', text: 'Published 25 verified public water conservation dashboards at the edge.' }
];

export const UNIVERSITY_MODULES = [
  {
    id: 'u-01',
    title: 'De-Hypnotizing the Mind: How Any Company Actually Ships',
    duration: '15 min read',
    description: 'Demystify the corporate illusion. Every successful software product follows the exact same 4 universal phases. When you remove corporate meeting overhead, solo creators can build and iterate with immense velocity.',
    lessons: [
      { name: 'The 4 Universal Phases', text: 'Thought → Blueprint, Parts → Code, Testing & Self-Healing, and Market & Distribution. That is the universal engineering pattern behind modern software products.' },
      { name: 'The Communication Tax', text: 'Why 50 people create 1,225 communication channels that slow down shipping velocity.' },
      { name: 'The Solo Creator Advantage', text: 'Clear intention + minimal coordination friction + automated test-driven execution = rapid real-world delivery.' }
    ]
  },
  {
    id: 'u-02',
    title: 'Earth-First Creation: Solving Water & Climate Crises',
    duration: '25 min deep-dive',
    description: 'Why build another useless advertising widget? Use Bramha to build proven technologies that save clean water, regenerate soil, and heal living ecosystems.',
    lessons: [
      { name: 'The Non-Revenue Water Crisis', text: 'How acoustic sensors detect underground leaks before billions of gallons are lost.' },
      { name: 'Precision Agriculture', text: 'Replacing ancient flood irrigation with smart drip systems using evapotranspiration data.' },
      { name: 'Circular Closed Loops', text: 'Architecting software that enables factories to recycle 100% of their industrial water.' }
    ]
  },
  {
    id: 'u-03',
    title: 'The Bramha Creation Loop: Building with Pure Intent',
    duration: '20 min masterclass',
    description: 'How to use the fresh-context builder so your AI never forgets requirements, auto-heals bugs, and finishes your complete application unattended.',
    lessons: [
      { name: 'Freezing the Blueprint (GSD)', text: 'Locking down database models and role rules before touching code.' },
      { name: 'The Persistent Worker (Ralph Loop)', text: 'Spawning clean memory per task so the builder never gets confused or tired.' },
      { name: 'The Automated Inspector', text: 'Verifying every feature with automated tests before it ever sees a human user.' }
    ]
  }
];
