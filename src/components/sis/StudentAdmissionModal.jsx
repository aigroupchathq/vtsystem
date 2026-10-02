import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  User, 
  Users, 
  FileText
} from 'lucide-react';
import { StudentsService } from '../../modules/sis/students.service.js';
import { db } from '../../database/db.js';

export default function StudentAdmissionModal({
  isOpen,
  onClose,
  tenantContext,
  onAdmissionSuccess
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState(() => ({
    // Step 1: Student Bio
    admissionNumber: `VT-2026-${Math.floor(100 + Math.random() * 900)}`,
    firstName: '',
    lastName: '',
    dob: '2015-06-15',
    gender: 'MALE',
    bloodGroup: 'B+',
    aadhaarLastFour: '4589',
    emergencyPhone: '',
    medicalNotes: '',

    // Step 2: Guardian Info
    guardianFirstName: '',
    guardianLastName: '',
    guardianRelation: 'FATHER',
    guardianPhone: '',
    guardianEmail: '',
    guardianOccupation: '',

    // Step 3: Academic Placement
    gradeId: 'grd-5',
    divisionId: 'div-pune-5a',
    rollNumber: '',

    // Step 4: Documents Check
    hasBirthCert: true,
    hasAadhaar: true,
    hasTransferCert: false
  }));

  if (!isOpen) return null;

  const grades = db.getGrades();
  const divisions = db.getDivisions(tenantContext.activeCampusId);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setError('');
    if (currentStep === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('First Name and Last Name are required.');
        return;
      }
      if (!formData.emergencyPhone.trim()) {
        setError('Emergency contact phone is required.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.guardianFirstName.trim() || !formData.guardianPhone.trim()) {
        setError('Primary Guardian Name and Phone are required.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');

    try {
      const documents = [];
      if (formData.hasBirthCert) {
        documents.push({ id: `doc-${Date.now()}-1`, documentType: 'BIRTH_CERTIFICATE', fileName: `${formData.firstName}_Birth_Certificate.pdf`, fileSize: 410000, verifiedAt: new Date().toISOString() });
      }
      if (formData.hasAadhaar) {
        documents.push({ id: `doc-${Date.now()}-2`, documentType: 'AADHAAR', fileName: `${formData.firstName}_Aadhaar_Masked.pdf`, fileSize: 290000, verifiedAt: new Date().toISOString() });
      }

      const payload = {
        campusId: tenantContext.activeCampusId,
        admissionNumber: formData.admissionNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        aadhaarLastFour: formData.aadhaarLastFour,
        emergencyPhone: formData.emergencyPhone,
        medicalNotes: formData.medicalNotes,
        gradeId: formData.gradeId,
        divisionId: formData.divisionId,
        rollNumber: formData.rollNumber ? parseInt(formData.rollNumber, 10) : undefined,
        guardian: {
          firstName: formData.guardianFirstName,
          lastName: formData.guardianLastName || formData.lastName,
          relation: formData.guardianRelation,
          phone: formData.guardianPhone,
          email: formData.guardianEmail,
          occupation: formData.guardianOccupation
        },
        documents
      };

      const result = StudentsService.admitStudent(tenantContext, payload);
      onAdmissionSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message || 'Admission failed');
    }
  };

  const steps = [
    { num: 1, title: 'Student Bio', icon: User },
    { num: 2, title: 'Guardian', icon: Users },
    { num: 3, title: 'Enrollment', icon: GraduationCap },
    { num: 4, title: 'Documents', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Student Admission Wizard</h2>
              <p className="text-xs text-slate-400">Admit & enroll new student into active campus registry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          {steps.map(s => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${
                  isCurrent ? 'text-white' : 'text-slate-500'
                }`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* STEP 1: Student Bio */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Admission Number *</label>
                  <input
                    type="text"
                    value={formData.admissionNumber}
                    onChange={(e) => handleChange('admissionNumber', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Emergency Phone *</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 00000"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">First Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Last Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Medical Notes & Allergies</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Mild asthma, allergy to peanuts, spectacles prescription..."
                  value={formData.medicalNotes}
                  onChange={(e) => handleChange('medicalNotes', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Guardian Info */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Guardian First Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Vikram"
                    value={formData.guardianFirstName}
                    onChange={(e) => handleChange('guardianFirstName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Guardian Relation</label>
                  <select
                    value={formData.guardianRelation}
                    onChange={(e) => handleChange('guardianRelation', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="FATHER">Father</option>
                    <option value="MOTHER">Mother</option>
                    <option value="LEGAL_GUARDIAN">Legal Guardian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Guardian Mobile Phone *</label>
                  <input
                    type="tel"
                    placeholder="+91 98230 00000"
                    value={formData.guardianPhone}
                    onChange={(e) => handleChange('guardianPhone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Guardian Email</label>
                  <input
                    type="email"
                    placeholder="parent@domain.com"
                    value={formData.guardianEmail}
                    onChange={(e) => handleChange('guardianEmail', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Occupation / Profession</label>
                <input
                  type="text"
                  placeholder="e.g. Physician / Software Consultant"
                  value={formData.guardianOccupation}
                  onChange={(e) => handleChange('guardianOccupation', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Academic Enrollment */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
                Enrollment will be created for active session <strong>2026-2027</strong> in active campus.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Target Grade *</label>
                  <select
                    value={formData.gradeId}
                    onChange={(e) => handleChange('gradeId', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    {grades.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Division / Section *</label>
                  <select
                    value={formData.divisionId}
                    onChange={(e) => handleChange('divisionId', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    {divisions.map(d => (
                      <option key={d.id} value={d.id}>Section {d.name} ({d.roomNumber || 'Classroom'})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Assigned Roll Number (Optional)</label>
                <input
                  type="number"
                  placeholder="Auto-generated if left blank"
                  value={formData.rollNumber}
                  onChange={(e) => handleChange('rollNumber', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Documents Verification Checklist */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300 mb-2">
                Verify mandatory documents collected during admissions verification:
              </div>

              <label className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">Government Birth Certificate</div>
                    <div className="text-[10px] text-slate-400">Mandatory verification under RTE / CBSE</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.hasBirthCert}
                  onChange={(e) => handleChange('hasBirthCert', e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
              </label>

              <label className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">Aadhaar Card (Masked)</div>
                    <div className="text-[10px] text-slate-400">Last 4 digits verification for DPDP compliance</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.hasAadhaar}
                  onChange={(e) => handleChange('hasAadhaar', e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
              </label>

              <label className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">Transfer Certificate (TC)</div>
                    <div className="text-[10px] text-slate-400">Required if migrating from another registered school</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.hasTransferCert}
                  onChange={(e) => handleChange('hasTransferCert', e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
              </label>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : <div />}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
            >
              Confirm Admission & Emit Audit Log
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
