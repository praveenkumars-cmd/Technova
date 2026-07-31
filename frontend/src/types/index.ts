export type UserRole = 'doctor' | 'patient' | 'receptionist' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  department?: string;
  specialization?: string;
  hospitalId?: string;
  roomNumber?: string;
  joinedDate?: string;
}

export type AppointmentStatus = 'pending' | 'approved' | 'completed' | 'rejected' | 'cancelled';
export type AppointmentType = 'In-Person' | 'Teleconsultation' | 'Emergency' | 'Follow-Up';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  patientPhone?: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar?: string;
  department: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 AM"
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string; // e.g. "500mg"
  frequency: string; // e.g. "1-0-1" (Morning-Afternoon-Night)
  duration: string; // e.g. "7 Days"
  notes?: string;
}

export interface Prescription {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: MedicationItem[];
  instructions: string;
  pdfUrl?: string;
}

export interface LabReport {
  id: string;
  title: string;
  category: string; // e.g. "Hematology", "Lipid Panel"
  date: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  fileSize: string;
  downloadUrl?: string;
}

export interface ScanReport {
  id: string;
  title: string;
  modality: 'MRI' | 'CT Scan' | 'X-Ray' | 'Ultrasound';
  bodyPart: string;
  date: string;
  imageUrl?: string;
  findings: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  bloodGroup: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: string; // e.g. "178 cm"
  weight: string; // e.g. "74 kg"
  allergies: string[];
  existingConditions: string[];
  medicalHistory: {
    year: string;
    condition: string;
    treatment: string;
  }[];
  vaccinations: {
    name: string;
    date: string;
    status: 'Completed' | 'Due';
  }[];
  labReports: LabReport[];
  scanReports: ScanReport[];
  prescriptions: Prescription[];
  emergencyContact: EmergencyContact;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'approved' | 'rejected' | 'reminder' | 'prescription' | 'emergency' | 'system';
  read: boolean;
  targetRole?: UserRole | 'all';
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  doctorCount: number;
  headDoctor: string;
  description: string;
  location: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: UserRole;
  timestamp: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface DutyShift {
  id: string;
  staffName: string;
  role: string;
  department: string;
  shift: 'Morning (07:00-15:00)' | 'Evening (15:00-23:00)' | 'Night (23:00-07:00)';
  day: string;
  status: 'On Duty' | 'Scheduled' | 'On Leave';
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  description?: string;
}
