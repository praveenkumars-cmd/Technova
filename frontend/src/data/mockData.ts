import {
  User,
  Appointment,
  HealthRecord,
  Prescription,
  Department,
  NotificationItem,
  AuditLog,
  DutyShift
} from '../types';

export const mockUsers: Record<string, User> = {
  doctor: {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'sarah.jenkins@pulsecare.com',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    department: 'Cardiology',
    specialization: 'Interventional Cardiologist',
    phone: '+1 (555) 234-5678',
    roomNumber: 'Suite 402 - Heart & Vascular Center',
    hospitalId: 'DOC-88219'
  },
  patient: {
    id: 'pat-1',
    name: 'Alexander Wright',
    email: 'alexander.wright@gmail.com',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    phone: '+1 (555) 876-5432',
    hospitalId: 'PAT-10942'
  },
  receptionist: {
    id: 'rec-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@pulsecare.com',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    department: 'Main Admissions Desk',
    phone: '+1 (555) 345-6789',
    hospitalId: 'REC-3001'
  },
  admin: {
    id: 'adm-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@pulsecare.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    department: 'Executive Operations',
    phone: '+1 (555) 999-0000',
    hospitalId: 'ADM-0001'
  }
};

export const mockDoctors = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Chief Cardiologist',
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    rating: 4.9,
    reviews: 142,
    experience: '14+ Yrs Exp.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    fee: '$180'
  },
  {
    id: 'doc-2',
    name: 'Dr. Robert Chen',
    title: 'Neurology Specialist',
    department: 'Neurology',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    reviews: 98,
    experience: '11+ Yrs Exp.',
    availableDays: ['Mon', 'Wed', 'Fri'],
    timeSlots: ['09:30 AM', '11:00 AM', '03:00 PM'],
    fee: '$200'
  },
  {
    id: 'doc-3',
    name: 'Dr. Amanda Brooks',
    title: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=300',
    rating: 4.95,
    reviews: 210,
    experience: '16+ Yrs Exp.',
    availableDays: ['Tue', 'Wed', 'Thu', 'Sat'],
    timeSlots: ['10:00 AM', '01:30 PM', '03:30 PM'],
    fee: '$190'
  },
  {
    id: 'doc-4',
    name: 'Dr. James Wilson',
    title: 'Lead Pediatrician',
    department: 'Pediatrics',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    rating: 4.9,
    reviews: 320,
    experience: '12+ Yrs Exp.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['08:30 AM', '11:30 AM', '02:30 PM', '04:30 PM'],
    fee: '$150'
  },
  {
    id: 'doc-5',
    name: 'Dr. Emily Watson',
    title: 'Consultant Endocrinologist',
    department: 'Endocrinology',
    avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300',
    rating: 4.7,
    reviews: 76,
    experience: '9+ Yrs Exp.',
    availableDays: ['Mon', 'Wed', 'Thu'],
    timeSlots: ['10:00 AM', '02:00 PM'],
    fee: '$170'
  },
  {
    id: 'doc-6',
    name: 'Dr. Michael Vance',
    title: 'Oncology Specialist',
    department: 'Oncology',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300',
    rating: 4.88,
    reviews: 115,
    experience: '18+ Yrs Exp.',
    availableDays: ['Tue', 'Fri'],
    timeSlots: ['09:00 AM', '01:00 PM'],
    fee: '$250'
  }
];

export const mockDepartments: Department[] = [
  {
    id: 'dept-1',
    name: 'Cardiology',
    iconName: 'HeartPulse',
    doctorCount: 12,
    headDoctor: 'Dr. Sarah Jenkins',
    description: 'Comprehensive cardiovascular disease diagnosis, interventional stenting, and heart failure care.',
    location: 'Building A, 4th Floor'
  },
  {
    id: 'dept-2',
    name: 'Neurology',
    iconName: 'Brain',
    doctorCount: 8,
    headDoctor: 'Dr. Robert Chen',
    description: 'Advanced brain, spine, neurovascular, and neuromuscular disorder evaluation.',
    location: 'Building B, 2nd Floor'
  },
  {
    id: 'dept-3',
    name: 'Orthopedics',
    iconName: 'Bone',
    doctorCount: 15,
    headDoctor: 'Dr. Amanda Brooks',
    description: 'Joint replacement, trauma surgery, sports injuries, and spinal corrective care.',
    location: 'Building A, 1st Floor'
  },
  {
    id: 'dept-4',
    name: 'Pediatrics',
    iconName: 'Baby',
    doctorCount: 10,
    headDoctor: 'Dr. James Wilson',
    description: 'Neonatal intensive care, general child wellness, immunizations, and pediatric subspecialties.',
    location: 'Building C, 3rd Floor'
  },
  {
    id: 'dept-5',
    name: 'Oncology',
    iconName: 'Activity',
    doctorCount: 9,
    headDoctor: 'Dr. Michael Vance',
    description: 'Multidisciplinary cancer care, immunotherapy, precision radiation, and targeted treatments.',
    location: 'Building D, Ground Floor'
  },
  {
    id: 'dept-6',
    name: 'Emergency Medicine',
    iconName: 'Siren',
    doctorCount: 24,
    headDoctor: 'Dr. David Miller',
    description: 'Level 1 Trauma Center with 24/7 rapid critical resuscitation and emergency care unit.',
    location: 'ER Trauma Pavilion'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'APT-1001',
    patientId: 'pat-1',
    patientName: 'Alexander Wright',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    patientPhone: '+1 (555) 876-5432',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    department: 'Cardiology',
    date: '2026-08-03',
    timeSlot: '09:30 AM',
    type: 'In-Person',
    status: 'approved',
    reason: 'Routine quarterly ECG follow-up & blood pressure assessment',
    notes: 'Patient reports mild tightness after morning workouts.',
    createdAt: '2026-07-28'
  },
  {
    id: 'APT-1002',
    patientId: 'pat-2',
    patientName: 'Sophia Martinez',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    patientPhone: '+1 (555) 432-1098',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    department: 'Cardiology',
    date: '2026-08-01',
    timeSlot: '11:00 AM',
    type: 'Emergency',
    status: 'approved',
    reason: 'Acute palpitations and chest pain onset 2 hours ago',
    notes: 'Stat ECG requested upon arrival.',
    createdAt: '2026-07-31'
  },
  {
    id: 'APT-1003',
    patientId: 'pat-3',
    patientName: 'David Kim',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    patientPhone: '+1 (555) 654-3210',
    doctorId: 'doc-2',
    doctorName: 'Dr. Robert Chen',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    department: 'Neurology',
    date: '2026-08-04',
    timeSlot: '02:00 PM',
    type: 'Teleconsultation',
    status: 'pending',
    reason: 'Persistent migraine with aura - medication review',
    createdAt: '2026-07-30'
  },
  {
    id: 'APT-1004',
    patientId: 'pat-4',
    patientName: 'Olivia Taylor',
    patientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    patientPhone: '+1 (555) 789-0123',
    doctorId: 'doc-3',
    doctorName: 'Dr. Amanda Brooks',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=300',
    department: 'Orthopedics',
    date: '2026-08-02',
    timeSlot: '10:00 AM',
    type: 'In-Person',
    status: 'pending',
    reason: 'Post-knee arthroscopy mobility evaluation',
    createdAt: '2026-07-29'
  },
  {
    id: 'APT-1005',
    patientId: 'pat-1',
    patientName: 'Alexander Wright',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    patientPhone: '+1 (555) 876-5432',
    doctorId: 'doc-2',
    doctorName: 'Dr. Robert Chen',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    department: 'Neurology',
    date: '2026-07-15',
    timeSlot: '03:30 PM',
    type: 'In-Person',
    status: 'completed',
    reason: 'Cervical spine stiffness & tension headache relief',
    notes: 'Prescribed muscle relaxants and physical therapy twice weekly.',
    createdAt: '2026-07-10'
  },
  {
    id: 'APT-1006',
    patientId: 'pat-5',
    patientName: 'Ethan Harrison',
    patientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    patientPhone: '+1 (555) 987-6543',
    doctorId: 'doc-4',
    doctorName: 'Dr. James Wilson',
    doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    department: 'Pediatrics',
    date: '2026-08-05',
    timeSlot: '08:30 AM',
    type: 'In-Person',
    status: 'approved',
    reason: 'Annual developmental checkup & MMR booster shot',
    createdAt: '2026-07-31'
  }
];

export const mockHealthRecord: HealthRecord = {
  id: 'HR-PAT-10942',
  patientId: 'pat-1',
  bloodGroup: 'A+',
  age: 34,
  gender: 'Male',
  height: '181 cm',
  weight: '76 kg',
  allergies: ['Penicillin', 'Peanuts', 'Latex'],
  existingConditions: ['Hypertension (Stage 1)', 'Mild Asthma'],
  medicalHistory: [
    { year: '2024', condition: 'L5-S1 Lumbar Herniated Disc', treatment: 'Physical Therapy & Epidural Steroid Injection' },
    { year: '2021', condition: 'Acute Appendicitis', treatment: 'Laparoscopic Appendectomy at St. Jude Medical' },
    { year: '2018', condition: 'Right Ankle Sprain', treatment: 'RICE protocol & 4-week removable boot' }
  ],
  vaccinations: [
    { name: 'COVID-19 Booster (Pfizer Bivalent)', date: '2024-11-12', status: 'Completed' },
    { name: 'Influenza Annual Vaccine', date: '2025-09-20', status: 'Completed' },
    { name: 'Tetanus, Diphtheria, Pertussis (Tdap)', date: '2022-04-15', status: 'Completed' },
    { name: 'Hepatitis B Booster', date: '2026-10-15', status: 'Due' }
  ],
  labReports: [
    {
      id: 'LAB-901',
      title: 'Comprehensive Lipid & Cholesterol Panel',
      category: 'Biochemistry',
      date: '2026-07-20',
      status: 'Normal',
      fileSize: '1.4 MB'
    },
    {
      id: 'LAB-902',
      title: 'Complete Blood Count (CBC) with Differential',
      category: 'Hematology',
      date: '2026-06-15',
      status: 'Normal',
      fileSize: '840 KB'
    },
    {
      id: 'LAB-903',
      title: 'HbA1c & Fasting Blood Glucose Level',
      category: 'Endocrinology',
      date: '2026-04-10',
      status: 'Abnormal',
      fileSize: '1.1 MB'
    }
  ],
  scanReports: [
    {
      id: 'SCAN-401',
      title: 'Lumbar Spine MRI (T1/T2 Weighted)',
      modality: 'MRI',
      bodyPart: 'Lumbar Spine',
      date: '2025-11-04',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500',
      findings: 'Mild focal posterior disc bulge at L5-S1 without high-grade spinal canal stenosis.'
    },
    {
      id: 'SCAN-402',
      title: 'Chest Radiogram (PA View)',
      modality: 'X-Ray',
      bodyPart: 'Chest',
      date: '2025-05-18',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500',
      findings: 'Lungs are clear bilaterally. No cardiomegaly or pleural effusion observed.'
    }
  ],
  prescriptions: [
    {
      id: 'RX-7721',
      appointmentId: 'APT-1005',
      patientId: 'pat-1',
      patientName: 'Alexander Wright',
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Jenkins',
      date: '2026-07-28',
      diagnosis: 'Primary Essential Hypertension & mild exertional tachycardia',
      medications: [
        { id: 'm1', name: 'Lisinopril', dosage: '10mg', frequency: '1-0-0 (Morning)', duration: '30 Days', notes: 'Take with water before breakfast' },
        { id: 'm2', name: 'Atorvastatin', dosage: '20mg', frequency: '0-0-1 (Night)', duration: '30 Days', notes: 'Take after evening meal' }
      ],
      instructions: 'Maintain low-sodium diet (<2000mg/day). Monitor blood pressure twice daily and log in app.'
    }
  ],
  emergencyContact: {
    name: 'Eleanor Wright',
    relationship: 'Spouse',
    phone: '+1 (555) 912-3456'
  }
};

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Appointment Approved',
    message: 'Your Cardiology consultation with Dr. Sarah Jenkins on Aug 3 at 09:30 AM has been confirmed.',
    timestamp: '10 mins ago',
    type: 'approved',
    read: false,
    targetRole: 'patient'
  },
  {
    id: 'notif-2',
    title: 'New Emergency Case Assigned',
    message: 'Patient Sophia Martinez admitted to ER Bay 4 with acute palpitations.',
    timestamp: '25 mins ago',
    type: 'emergency',
    read: false,
    targetRole: 'doctor'
  },
  {
    id: 'notif-3',
    title: 'Prescription Digital Copy Ready',
    message: 'Dr. Sarah Jenkins generated your digital prescription (RX-7721). Click to view & download.',
    timestamp: '2 hours ago',
    type: 'prescription',
    read: true,
    targetRole: 'patient'
  },
  {
    id: 'notif-4',
    title: 'Shift Schedule Update',
    message: 'Weekend night shift roster for ER staff has been published by Administrator.',
    timestamp: '1 day ago',
    type: 'system',
    read: true,
    targetRole: 'receptionist'
  }
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'log-1', action: 'User Login Success', user: 'Dr. Sarah Jenkins', role: 'doctor', timestamp: '2026-07-31 09:14:02', ipAddress: '192.168.1.45', status: 'Success' },
  { id: 'log-2', action: 'Patient Record View', user: 'Elena Rostova', role: 'receptionist', timestamp: '2026-07-31 09:22:15', ipAddress: '192.168.1.88', status: 'Success' },
  { id: 'log-3', action: 'Appointment Status Change', user: 'Dr. Sarah Jenkins', role: 'doctor', timestamp: '2026-07-31 10:05:40', ipAddress: '192.168.1.45', status: 'Success' },
  { id: 'log-4', action: 'Failed Admin Auth Attempt', user: 'Unknown (ip_88)', role: 'admin', timestamp: '2026-07-31 11:40:12', ipAddress: '172.56.21.99', status: 'Failed' },
  { id: 'log-5', action: 'System Backup Initiated', user: 'Marcus Vance', role: 'admin', timestamp: '2026-07-31 12:00:00', ipAddress: '192.168.1.10', status: 'Success' }
];

export const mockDutyShifts: DutyShift[] = [
  { id: 's1', staffName: 'Dr. Sarah Jenkins', role: 'Chief Doctor', department: 'Cardiology', shift: 'Morning (07:00-15:00)', day: 'Today', status: 'On Duty' },
  { id: 's2', staffName: 'Elena Rostova', role: 'Lead Receptionist', department: 'Admissions', shift: 'Morning (07:00-15:00)', day: 'Today', status: 'On Duty' },
  { id: 's3', staffName: 'Nurse Clara Oswald', role: 'Senior ER Nurse', department: 'Emergency Medicine', shift: 'Evening (15:00-23:00)', day: 'Today', status: 'Scheduled' },
  { id: 's4', staffName: 'Dr. Robert Chen', role: 'Neurologist', department: 'Neurology', shift: 'Night (23:00-07:00)', day: 'Today', status: 'Scheduled' },
  { id: 's5', staffName: 'Nurse David Miller', role: 'Staff Nurse', department: 'Pediatrics', shift: 'Morning (07:00-15:00)', day: 'Today', status: 'On Leave' }
];

// Recharts Analytics Datasets
export const monthlyAppointmentsData = [
  { month: 'Jan', total: 420, completed: 380, cancelled: 40 },
  { month: 'Feb', total: 510, completed: 470, cancelled: 40 },
  { month: 'Mar', total: 640, completed: 590, cancelled: 50 },
  { month: 'Apr', total: 720, completed: 680, cancelled: 40 },
  { month: 'May', total: 850, completed: 800, cancelled: 50 },
  { month: 'Jun', total: 940, completed: 890, cancelled: 50 },
  { month: 'Jul', total: 1120, completed: 1060, cancelled: 60 }
];

export const patientGrowthData = [
  { month: 'Jan', newPatients: 120, returning: 300 },
  { month: 'Feb', newPatients: 145, returning: 365 },
  { month: 'Mar', newPatients: 190, returning: 450 },
  { month: 'Apr', newPatients: 210, returning: 510 },
  { month: 'May', newPatients: 260, returning: 590 },
  { month: 'Jun', newPatients: 310, returning: 630 },
  { month: 'Jul', newPatients: 380, returning: 740 }
];

export const revenueOverviewData = [
  { month: 'Jan', revenue: 145000, insurance: 98000, outOfPocket: 47000 },
  { month: 'Feb', revenue: 168000, insurance: 112000, outOfPocket: 56000 },
  { month: 'Mar', revenue: 192000, insurance: 130000, outOfPocket: 62000 },
  { month: 'Apr', revenue: 215000, insurance: 148000, outOfPocket: 67000 },
  { month: 'May', revenue: 248000, insurance: 172000, outOfPocket: 76000 },
  { month: 'Jun', revenue: 285000, insurance: 195000, outOfPocket: 90000 },
  { month: 'Jul', revenue: 320000, insurance: 220000, outOfPocket: 100000 }
];

export const emergencyCasesData = [
  { day: 'Mon', cases: 18 },
  { day: 'Tue', cases: 24 },
  { day: 'Wed', cases: 15 },
  { day: 'Thu', cases: 29 },
  { day: 'Fri', cases: 32 },
  { day: 'Sat', cases: 41 },
  { day: 'Sun', cases: 38 }
];

export const departmentDistributionData = [
  { name: 'Cardiology', value: 35, color: '#3B82F6' },
  { name: 'Orthopedics', value: 25, color: '#10B981' },
  { name: 'Neurology', value: 18, color: '#8B5CF6' },
  { name: 'Pediatrics', value: 12, color: '#F59E0B' },
  { name: 'Emergency', value: 10, color: '#EF4444' }
];
