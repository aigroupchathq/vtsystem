# 04 — Core User Journeys: VEDIC TREE OS

## 1. Overview of Key Critical Journeys

Every critical journey is mapped with emotional state, friction points, step-by-step actions, and the explicit 5 orientation answers.

---

## 2. Journey 1: Teacher Morning Classroom Attendance (<60 Seconds)

### Context & Persona
- **Actor**: Sunita Patil (Class 5-B Class Teacher).
- **Environment**: Noisy classroom, 8:05 AM, smart device or classroom tablet, intermittent Wi-Fi.
- **Goal**: Mark 42 students present, record 3 absentees, submit to office before morning assembly bell.

### Journey Sequence
1. **Trigger**: Teacher opens VEDIC TREE OS mobile app or classroom tablet.
2. **Auto-Context**: System detects current time and Sunita's assigned class (`Grade 5B - Morning Attendance`).
3. **Orientation Answers**:
   - *Where am I?*: Grade 5, Division B, Classroom Attendance.
   - *What am I seeing?*: Grid of 42 student photo cards, pre-set to "All Present".
   - *What matters?*: Unchecked absentees, 1 child with an approved leave request on file.
   - *What can I do?*: Tap student cards to toggle status (Present -> Absent -> Tardy).
   - *What happens next?*: Instant SMS/WhatsApp to parents of absentees; office admin counter updates.
4. **Action**:
   - Sunita notices Rohan is absent. Taps Rohan's card -> turns Red (Absent).
   - Taps Ananya's card -> turns Amber (Tardy).
   - Taps "Submit Attendance (40 Present, 1 Absent, 1 Tardy)".
5. **Confirmation**: Haptic vibration, green checkmark toast, offline sync badge confirms data saved locally and synced to server. Total elapsed time: **38 seconds**.

---

## 3. Journey 2: Cashier Fee Collection at School Counter (<45 Seconds)

### Context & Persona
- **Actor**: Rajesh Verma (School Cashier / Accounts Assistant).
- **Environment**: Fee counter, queue of 15 parents on a Saturday morning. Dual monitors, barcode scanner, receipt printer.
- **Goal**: Find student, calculate late fee waiver, collect partial payment via UPI QR code, print thermal receipt.

### Journey Sequence
1. **Trigger**: Parent arrives at desk with admission slip or student name: "Aarav Sharma, Class 6".
2. **Fast Search**: Cashier presses `/` and types `Aarav Sharma 6A` or scans student ID card barcode.
3. **Instant Financial Card**:
   - *Where am I?*: Fee Desk > Student Invoices > Aarav Sharma (VT-2026-042).
   - *What am I seeing?*: Outstanding dues for Q2: ₹18,500 (Tuition: ₹15,000, Transport: ₹3,500).
   - *What matters?*: Due date passed 5 days ago; ₹500 late fee calculated automatically.
   - *What can I do?*: Collect full, collect partial, apply approved concession waiver, select payment method.
   - *What happens next?*: Dual screen presents dynamic UPI QR code to parent; receipt auto-prints on payment webhook.
4. **Action**:
   - Cashier clicks "Dynamic UPI QR".
   - Parent scans QR using Google Pay / PhonePe on the customer-facing secondary display.
   - Webhook signals `PAYMENT_SUCCESS` within 2 seconds.
5. **Completion**:
   - Thermal POS printer auto-prints 2 copies (Parent copy, School audit copy).
   - Digital receipt automatically pushed to parent's WhatsApp with PDF download link. Total elapsed time: **34 seconds**.

---

## 4. Journey 3: Parent Emergency Bus Tracking & Delay Alert

### Context & Persona
- **Actor**: Priya Deshmukh (Working Mother, IT professional).
- **Environment**: At office desk, 4:45 PM, heavy rain in city, expecting child's school bus at stop by 5:00 PM.
- **Goal**: Confirm bus location, estimated time of arrival, and driver/attendant contact.

### Journey Sequence
1. **Trigger**: Push notification on phone: "Route 14 bus running 12 mins late due to waterlogging at Bridge Rd. Revised ETA: 5:14 PM."
2. **One-Tap Access**: Priya taps notification -> opens directly to Live Bus Tracking view.
3. **Orientation Answers**:
   - *Where am I?*: Parent Portal > Transport > Bus Route 14 (Child: Kabir Deshmukh).
   - *What am I seeing?*: Live GPS map with moving bus icon, student's designated stop (Stop 4: Orchid Towers).
   - *What matters?*: Distance remaining: 3.2 km. Revised ETA: 5:14 PM. Speed: 24 km/h.
   - *What can I do?*: Call bus attendant directly with masked phone number; mark "Self-pickup from school" if needed.
   - *What happens next?*: Proximity alert triggers when bus is 500m away from stop.
4. **Outcome**: Zero anxiety, no frantic calls to the school reception, complete transparency.

---

## 5. Journey 4: Principal Morning Leadership Briefing

### Context & Persona
- **Actor**: Dr. Meenakshi Sundaram (Principal, Vedic Tree International School).
- **Environment**: Principal cabin, 8:30 AM, drinking tea before morning assembly.
- **Goal**: Review campus pulse across 1,800 students and 110 staff members.

### Journey Sequence
1. **Dashboard Briefing View**:
   - *Where am I?*: Principal Executive Dashboard > Pune Campus.
   - *What am I seeing?*: Real-time operational widgets: Student Attendance (94.8%), Staff Attendance (98.2%), 2 Teacher Absences with substitutes assigned.
   - *What matters?*: High school physics class has an unassigned substitution; 1 parent escalation ticket open > 24 hours.
   - *What can I do?*: Approve substitute teacher in one tap; forward parent escalation to Vice Principal with note.
   - *What happens next?*: Class timetable on teacher's phone updates instantly; notification sent.
2. **Outcome**: Immediate operational equilibrium within 5 minutes of entering campus.
