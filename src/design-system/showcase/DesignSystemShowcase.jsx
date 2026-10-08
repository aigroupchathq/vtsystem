import React, { useState } from 'react';
import {
  Heading,
  Text,
  NumericText,
  Avatar,
  Badge,
  StatusBadge,
  TrendIndicator,
  Button,
  IconButton,
  Dropdown,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Section,
  KPICard,
  Table,
  ProgressIndicator,
  FormField,
  TextInput,
  SearchInput,
  Select,
  Alert,
  EmptyState,
  PersonRow,
  StudentAvatar,
  BarChart,
  DonutChart,
  FunnelChart,
  DevelopmentCompass,
  NextBestAction,
  NetworkHealth,
  AIInsight,
} from '../index.js';
import {
  Sparkles,
  School,
  Users,
  IndianRupee,
  Calendar,
  MoreVertical,
  Plus,
  Compass,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Filter,
} from 'lucide-react';

export function DesignSystemShowcase({ onBack = null }) {
  const [activeTab, setActiveTab] = useState('signature'); // 'signature' | 'foundations' | 'actions' | 'data' | 'visuals'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [sampleInput, setSampleInput] = useState('Pune Campus Grade 7-A');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const sampleTableColumns = [
    { title: 'Student', key: 'name', render: (row) => <StudentAvatar name={row.name} grade={row.grade} division={row.division} /> },
    { title: 'Admission No', key: 'admNo', render: (row) => <span className="font-mono text-xs text-slate-500">{row.admNo}</span> },
    { title: 'Attendance', key: 'attendance', align: 'right', render: (row) => <span className="font-bold tabular-nums text-slate-800 dark:text-slate-200">{row.attendance}</span> },
    { title: 'Development', key: 'compass', render: (row) => <Badge variant="primary" dot size="sm">{row.compass}</Badge> },
    { title: 'Status', key: 'status', render: (row) => <StatusBadge status={row.status} /> },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      render: () => (
        <Dropdown trigger={<IconButton icon={MoreVertical} label="Options" size="sm" />} align="right">
          {({ close }) => (
            <>
              <DropdownItem onClick={close}>View Student 360</DropdownItem>
              <DropdownItem onClick={close}>Academic Portfolio</DropdownItem>
              <DropdownItem onClick={close} tone="danger">Flag Safeguarding</DropdownItem>
            </>
          )}
        </Dropdown>
      ),
    },
  ];

  const sampleTableData = [
    { id: '1', name: 'Aarav Sharma', admNo: 'VT-2026-0842', grade: 'Grade 7', division: 'Div A', attendance: '96.4%', compass: 'Holistic 91%', status: 'active' },
    { id: '2', name: 'Ananya Deshmukh', admNo: 'VT-2026-0843', grade: 'Grade 7', division: 'Div A', attendance: '98.1%', compass: 'Exemplary 95%', status: 'active' },
    { id: '3', name: 'Kabir Patel', admNo: 'VT-2026-0844', grade: 'Grade 7', division: 'Div B', attendance: '88.2%', compass: 'Developing 84%', status: 'pending' },
    { id: '4', name: 'Diya Kulkarni', admNo: 'VT-2026-0845', grade: 'Grade 6', division: 'Div A', attendance: '94.0%', compass: 'Strong 89%', status: 'admitted' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F8FAF8] text-slate-900'} p-4 sm:p-8 font-sans transition-colors duration-200`}>
      {/* Top Banner & Control Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#0F4C35] text-white flex items-center justify-center font-bold text-base shadow-sm">
                VT
              </span>
              <div>
                <Heading level="h1" className="text-xl sm:text-2xl font-bold">
                  VEDIC TREE OS Design System
                </Heading>
                <Text variant="caption" tone="muted">
                  Enterprise education design language • Tokens, Foundations, Components & Signature Widgets
                </Text>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
            >
              {isDarkMode ? '☀️ Switch to Light (Default)' : '🌙 Switch to Dark Mode'}
            </Button>
            {onBack && (
              <Button variant="secondary" size="sm" onClick={onBack}>
                Return to Workspace
              </Button>
            )}
          </div>
        </div>

        {/* Showcase Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'signature', label: 'Signature Vedic Components', icon: Compass },
            { id: 'data', label: 'KPIs, Tables & Metrics', icon: Activity },
            { id: 'foundations', label: 'Tokens & Foundations', icon: Layers },
            { id: 'actions', label: 'Actions & Inputs', icon: CheckCircle2 },
            { id: 'visuals', label: 'Charts & Funnels', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#0F4C35] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* ========================================================================= */}
        {/* TAB 1: SIGNATURE VEDIC TREE COMPONENTS */}
        {/* ========================================================================= */}
        {activeTab === 'signature' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Signature 1: Development Compass */}
            <Section
              title="1. Vedic Tree Development Compass"
              description="A measurable, 4-quadrant holistic child development visualizer (Academics, Character & Values, Wellbeing, Life Skills)"
            >
              <DevelopmentCompass studentName="Aarav Sharma (Grade 7-A)" />
            </Section>

            {/* Signature 2: Next Best Action */}
            <Section
              title="2. Next Best Action Engine"
              description="Contextual, prioritized operational directives that turn passive reporting into high-leverage workflows"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NextBestAction
                  priority="urgent"
                  context="Admissions Pipeline • Baner Campus"
                  actionTitle="27 enquiries have not received follow-up within 24 hours"
                  reason="Historical conversion drops 48% when initial counsellor outreach exceeds the 24-hour SLA."
                  impactMetric="+₹14.2 L Projected Admissions Value"
                  ctaText="Dispatch WhatsApp Nudge"
                  onAction={() => alert('Dispatched contextual automated WhatsApp outreach')}
                />
                <NextBestAction
                  priority="high"
                  context="Student Safeguarding • Kothrud Campus"
                  actionTitle="Review 3 consecutive unnotified student absences"
                  reason="Grade 8 cohort attendance has dipped below 90% threshold for 2 consecutive days."
                  impactMetric="SLA Threshold Breached"
                  ctaText="Review Absences"
                  onAction={() => alert('Opening Attendance Exceptions Modal')}
                />
              </div>
            </Section>

            {/* Signature 3: Network Health */}
            <Section
              title="3. Vedic Tree Network Health Matrix"
              description="Operational health indicator tracking all five fundamental organizational pillars"
            >
              <NetworkHealth />
            </Section>

            {/* Signature 4: AI Insight */}
            <Section
              title="4. Contextual AI Insight"
              description="Intelligent copilot recommendations strictly grounded in verified system telemetry"
            >
              <AIInsight
                title="Cross-Campus Absenteeism Correlated with Term-End Exam Preparation"
                insight="Student attendance across 3 campuses has experienced a 4.2% dip over the past 10 days, primarily clustered in Grades 6–8 Mathematics revision periods."
                confidence={96}
                verifiedData={[
                  { label: 'Impacted Campuses', value: 'Baner, Kothrud, Aundh' },
                  { label: 'Primary Cohort', value: 'Grades 6–8 (512 students)' },
                  { label: 'Attendance Delta', value: '-4.2% vs 30-day baseline' },
                ]}
                actionLabel="Generate Remedial Attendance Plan"
                onAction={() => alert('Generated automated revision schedule and parent update')}
              />
            </Section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DATA & KPIS */}
        {/* ========================================================================= */}
        {activeTab === 'data' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <Section title="Executive KPI Cards" description="Calibrated numeric typography with tabular numerals, trend deltas, and drill-down states">
              <Grid cols={4} gap={4}>
                <KPICard
                  title="Total Schools & Campuses"
                  value="24"
                  subtitle="Across 3 regions"
                  trend="+3"
                  trendLabel="this quarter"
                  icon={School}
                  tone="brand"
                  onClick={() => {}}
                />
                <KPICard
                  title="Enrolled Students"
                  value="18,642"
                  subtitle="Full capacity: 94.2%"
                  trend="+8.4%"
                  trendLabel="vs last year"
                  icon={Users}
                  tone="brand"
                  onClick={() => {}}
                />
                <KPICard
                  title="Fee Collections"
                  value="8.4"
                  prefix="₹"
                  suffix="Cr"
                  subtitle="81.3% collection rate"
                  trend="+11.8%"
                  icon={IndianRupee}
                  tone="accent"
                  onClick={() => {}}
                />
                <KPICard
                  title="Network Attendance"
                  value="94.7%"
                  subtitle="Daily average across cohorts"
                  trend="+1.9%"
                  icon={Calendar}
                  tone="success"
                  onClick={() => {}}
                />
              </Grid>
            </Section>

            <Section title="Standard Enterprise Data Table" description="Sortable columns, custom cell renderers, and responsive padding">
              <Table
                columns={sampleTableColumns}
                data={sampleTableData}
                onRowClick={(row) => alert(`Selected student: ${row.name}`)}
              />
            </Section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TOKENS & FOUNDATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'foundations' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <Section title="Color Palette & Brand Identity" description="Deep Vedic Green, Saffron Gold, and Enterprise Slate">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#0F4C35] text-white font-medium shadow-sm">
                  <div className="font-bold text-sm">Vedic Green</div>
                  <div className="opacity-80">#0F4C35 • Brand 900</div>
                </div>
                <div className="p-4 rounded-xl bg-[#16654A] text-white font-medium shadow-sm">
                  <div className="font-bold text-sm">Green Light</div>
                  <div className="opacity-80">#16654A • Brand 800</div>
                </div>
                <div className="p-4 rounded-xl bg-[#D97706] text-white font-medium shadow-sm">
                  <div className="font-bold text-sm">Saffron Gold</div>
                  <div className="opacity-80">#D97706 • Accent 600</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0F172A] text-white font-medium shadow-sm">
                  <div className="font-bold text-sm">Slate Ink</div>
                  <div className="opacity-80">#0F172A • Slate 900</div>
                </div>
                <div className="p-4 rounded-xl bg-[#15803D] text-white font-medium shadow-sm">
                  <div className="font-bold text-sm">Emerald Success</div>
                  <div className="opacity-80">#15803D • Semantic</div>
                </div>
                <div className="p-4 rounded-xl bg-[#B91C1C] text-white font-medium shadow-sm">
                  <div className="font-bold text-sm">Crimson Alert</div>
                  <div className="opacity-80">#B91C1C • Safeguarding</div>
                </div>
              </div>
            </Section>

            <Section title="Typography Scale" description="Calibrated heading and body hierarchy">
              <Card>
                <CardBody className="space-y-4">
                  <div>
                    <Heading level="display">Display: The Operating System for Vedic Tree</Heading>
                  </div>
                  <div>
                    <Heading level="h1">H1: Executive Command Center Overview</Heading>
                  </div>
                  <div>
                    <Heading level="h2">H2: Holistic Student Development Profile</Heading>
                  </div>
                  <div>
                    <Heading level="h3">H3: Continuous Comprehensive Evaluation (CCE)</Heading>
                  </div>
                  <div>
                    <Text variant="lead">Lead paragraph: Built to run, govern, and scale Vedic Tree schools across multiple regions.</Text>
                  </div>
                  <div>
                    <Text variant="body">Body copy: Rigorous multi-tenancy ensures zero cross-school data leakage while allowing HQ leadership universal governance telemetry.</Text>
                  </div>
                  <div>
                    <Text variant="small" tone="muted">Small muted text: Last synchronized 2 minutes ago via secure ledger event stream.</Text>
                  </div>
                </CardBody>
              </Card>
            </Section>

            <Section title="Status Badges & Trend Indicators" description="Consistent semantic labeling">
              <div className="flex flex-wrap gap-3 items-center">
                <StatusBadge status="active" />
                <StatusBadge status="admitted" />
                <StatusBadge status="pending" />
                <StatusBadge status="overdue" />
                <StatusBadge status="draft" />
                <TrendIndicator value="+8.4%" label="quarterly" />
                <TrendIndicator value="-2.1%" label="variance" />
                <TrendIndicator value="0.0%" label="flat" />
              </div>
            </Section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ACTIONS & INPUTS */}
        {/* ========================================================================= */}
        {activeTab === 'actions' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <Section title="Button Variants & States" description="High-contrast, accessible interaction buttons">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" icon={Plus}>Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="saffron">Saffron Heritage</Button>
                <Button variant="outline">Outline Action</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="danger">Destructive Action</Button>
                <Button variant="primary" loading>Saving Changes</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </Section>

            <Section title="Enterprise Form Controls" description="Accessible inputs, clearable search, and select boxes">
              <Grid cols={3} gap={4}>
                <FormField label="Campus Identifier" id="campus-id" required hint="Must match registered regional code">
                  <TextInput id="campus-id" value={sampleInput} onChange={(e) => setSampleInput(e.target.value)} />
                </FormField>
                <FormField label="Global Record Search" id="search-id">
                  <SearchInput value={searchVal} onChange={(e) => setSearchVal(e.target.value)} shortcut="⌘K" onClear={() => setSearchVal('')} />
                </FormField>
                <FormField label="Operational Region" id="region-id">
                  <Select
                    id="region-id"
                    options={[
                      { value: 'pune', label: 'Pune Metropolitan Region' },
                      { value: 'mumbai', label: 'Mumbai Suburban Region' },
                      { value: 'nagpur', label: 'Vidarbha Region' },
                    ]}
                  />
                </FormField>
              </Grid>
            </Section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: VISUALIZATIONS & CHARTS */}
        {/* ========================================================================= */}
        {activeTab === 'visuals' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <Grid cols={2} gap={6}>
              <Card>
                <CardHeader title="Admissions Pipeline Funnel" subtitle="Lead to Confirmed Admission Conversion" />
                <CardBody>
                  <FunnelChart
                    steps={[
                      { label: 'Inbound Leads (WhatsApp + Web)', count: 1284, rate: '100%' },
                      { label: 'Qualified Enquiries', count: 842, rate: '65.5%' },
                      { label: 'Counselling Completed', count: 526, rate: '40.9%' },
                      { label: 'Campus Visits', count: 318, rate: '24.7%' },
                      { label: 'Submitted Applications', count: 241, rate: '18.7%' },
                      { label: 'Confirmed Admissions', count: 154, rate: '12.0%' },
                    ]}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Fee Collection Status" subtitle="₹2.84 Cr Total Assessment" />
                <CardBody className="flex flex-col items-center justify-center pt-6">
                  <DonutChart
                    data={[
                      { label: 'Collected (₹2.31 Cr)', value: 81, color: '#0F4C35' },
                      { label: 'Outstanding (₹53 L)', value: 19, color: '#D97706' },
                    ]}
                    centerValue="81.3%"
                    centerLabel="Collection"
                  />
                </CardBody>
              </Card>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
