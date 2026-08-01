import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.resolve(__dirname, 'pulsecare-db.json');
const backupDir = path.resolve(__dirname, 'backups');

const initialDatabaseState = {
  users: [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Jenkins, MD',
      email: 'doctor@pulsecare.com',
      role: 'doctor',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      department: 'Cardiology',
      hospitalId: 'DOCTOR-9901',
      phone: '+1 (555) 234-5678',
      specialty: 'Interventional Cardiology',
      experience: '12 Years'
    },
    {
      id: 'pat-1',
      name: 'Alexander Wright',
      email: 'patient@pulsecare.com',
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      phone: '+1 (555) 876-5432',
      bloodGroup: 'O+',
      age: 42,
      gender: 'Male',
      hospitalId: 'PATIENT-8812'
    },
    {
      id: 'rec-1',
      name: 'Elena Rostova',
      email: 'receptionist@pulsecare.com',
      role: 'receptionist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      department: 'Admissions Desk',
      hospitalId: 'STAFF-3301'
    },
    {
      id: 'adm-1',
      name: 'Marcus Vance',
      email: 'admin@pulsecare.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      department: 'Hospital Executive Board',
      hospitalId: 'ADMIN-0001'
    }
  ],
  departments: [
    { id: 'dept-1', name: 'Cardiology', headDoctor: 'Dr. Sarah Jenkins', doctorCount: 14, description: 'Heart & Vascular Care' },
    { id: 'dept-2', name: 'Neurology', headDoctor: 'Dr. Robert Chen', doctorCount: 9, description: 'Brain & Spine Institute' },
    { id: 'dept-3', name: 'Orthopedics', headDoctor: 'Dr. Amanda Brooks', doctorCount: 11, description: 'Joint & Bone Reconstruction' },
    { id: 'dept-4', name: 'Pediatrics', headDoctor: 'Dr. Emily Watson', doctorCount: 8, description: 'Child & Adolescent Medicine' },
    { id: 'dept-5', name: 'Emergency', headDoctor: 'Dr. Marcus Thorne', doctorCount: 18, description: '24/7 Level-1 Trauma Center' }
  ],
  appointments: [
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
      notes: 'Patient responded well to Lisinopril therapy.',
      createdAt: '2026-07-28'
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
        { id: 'm1', name: 'Lisinopril', dosage: '10mg', frequency: '1-0-0 (Morning)', duration: '30 Days', notes: 'Take before breakfast' },
        { id: 'm2', name: 'Atorvastatin', dosage: '20mg', frequency: '0-0-1 (Night)', duration: '30 Days', notes: 'Take after evening meal' }
      ],
      instructions: 'Maintain low-sodium diet (<2000mg/day). Monitor blood pressure twice daily.'
    }
  ],
  auditLogs: [
    {
      id: 'LOG-9001',
      action: 'Doctor Portal Login',
      user: 'Dr. Sarah Jenkins',
      role: 'Doctor',
      timestamp: '2026-07-31 09:14 AM',
      ipAddress: '192.168.1.45',
      status: 'Success'
    }
  ]
};

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Read database from disk (fallback sync)
export function readDb() {
  try {
    if (!fs.existsSync(dbFilePath)) {
      writeDb(initialDatabaseState);
      return initialDatabaseState;
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[Database Engine] Error reading local db file:', err.message);
    writeDb(initialDatabaseState);
    return initialDatabaseState;
  }
}

// Write database to disk atomically (fallback sync)
export function writeDb(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[Database Engine] Error writing local db file:', err.message);
  }
}

// ==================================================================
// SUPABASE ASYNC DATABASE OPERATIONS
// ==================================================================

export async function fetchUsersFromSupabase() {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error || !data || data.length === 0) {
      return readDb().users;
    }
    return data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      department: u.department,
      hospitalId: u.hospital_id,
      phone: u.phone,
      specialty: u.specialty,
      experience: u.experience,
      bloodGroup: u.blood_group,
      age: u.age,
      gender: u.gender,
      createdAt: u.created_at
    }));
  } catch {
    return readDb().users;
  }
}

export async function fetchAppointmentsFromSupabase() {
  try {
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      return readDb().appointments;
    }
    return data.map((a) => ({
      id: a.id,
      patientId: a.patient_id,
      patientName: a.patient_name,
      patientAvatar: a.patient_avatar,
      patientPhone: a.patient_phone,
      doctorId: a.doctor_id,
      doctorName: a.doctor_name,
      doctorAvatar: a.doctor_avatar,
      department: a.department,
      date: a.date,
      timeSlot: a.time_slot,
      type: a.type,
      status: a.status,
      reason: a.reason,
      rejectionReason: a.rejection_reason,
      notes: a.notes,
      createdAt: a.created_at
    }));
  } catch {
    return readDb().appointments;
  }
}

export async function saveAppointmentToSupabase(apt) {
  try {
    const payload = {
      id: apt.id,
      patient_id: apt.patientId,
      patient_name: apt.patientName,
      patient_avatar: apt.patientAvatar,
      patient_phone: apt.patientPhone,
      doctor_id: apt.doctorId,
      doctor_name: apt.doctorName,
      doctor_avatar: apt.doctorAvatar,
      department: apt.department,
      date: apt.date,
      time_slot: apt.timeSlot,
      type: apt.type,
      status: apt.status,
      reason: apt.reason,
      notes: apt.notes
    };
    await supabase.from('appointments').upsert(payload);
  } catch (err) {
    console.warn('[Supabase Sync Warning]', err.message);
  }
}

export async function updateAppointmentStatusInSupabase(id, status, reason) {
  try {
    await supabase.from('appointments').update({ status, rejection_reason: reason }).eq('id', id);
  } catch (err) {
    console.warn('[Supabase Sync Warning]', err.message);
  }
}

export async function fetchPrescriptionsFromSupabase() {
  try {
    const { data, error } = await supabase.from('prescriptions').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      return readDb().prescriptions;
    }
    return data.map((p) => ({
      id: p.id,
      appointmentId: p.appointment_id,
      patientId: p.patient_id,
      patientName: p.patient_name,
      doctorId: p.doctor_id,
      doctorName: p.doctor_name,
      date: p.date,
      diagnosis: p.diagnosis,
      medications: p.medications,
      instructions: p.instructions
    }));
  } catch {
    return readDb().prescriptions;
  }
}

export async function savePrescriptionToSupabase(px) {
  try {
    const payload = {
      id: px.id,
      appointment_id: px.appointmentId,
      patient_id: px.patientId,
      patient_name: px.patientName,
      doctor_id: px.doctorId,
      doctor_name: px.doctorName,
      date: px.date,
      diagnosis: px.diagnosis,
      medications: px.medications,
      instructions: px.instructions
    };
    await supabase.from('prescriptions').upsert(payload);
  } catch (err) {
    console.warn('[Supabase Sync Warning]', err.message);
  }
}

export async function fetchDepartmentsFromSupabase() {
  try {
    const { data, error } = await supabase.from('departments').select('*');
    if (error || !data || data.length === 0) {
      return readDb().departments;
    }
    return data.map((d) => ({
      id: d.id,
      name: d.name,
      headDoctor: d.head_doctor,
      doctorCount: d.doctor_count,
      description: d.description
    }));
  } catch {
    return readDb().departments;
  }
}

export async function fetchAuditLogsFromSupabase() {
  try {
    const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return readDb().auditLogs;
    }
    return data.map((l) => ({
      id: l.id,
      action: l.action,
      user: l.user_name,
      role: l.role,
      timestamp: l.timestamp,
      ipAddress: l.ip_address,
      status: l.status
    }));
  } catch {
    return readDb().auditLogs;
  }
}

export async function saveAuditLogToSupabase(log) {
  try {
    await supabase.from('audit_logs').upsert({
      id: log.id,
      action: log.action,
      user_name: log.user,
      role: log.role,
      timestamp: log.timestamp,
      ip_address: log.ipAddress,
      status: log.status
    });
  } catch (err) {
    console.warn('[Supabase Audit Sync Warning]', err.message);
  }
}

// Create automated DB Backup Snapshot
export function createBackupSnapshot() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotPath = path.resolve(backupDir, `pulsecare-backup-${timestamp}.json`);
    const currentData = readDb();
    fs.writeFileSync(snapshotPath, JSON.stringify(currentData, null, 2), 'utf8');

    return {
      success: true,
      snapshotPath,
      filename: `pulsecare-backup-${timestamp}.json`,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export function initDb() {
  readDb();
  console.log(`[Database Engine] Persistent database initialized.`);
}

export default {
  readDb,
  writeDb,
  fetchUsersFromSupabase,
  fetchAppointmentsFromSupabase,
  saveAppointmentToSupabase,
  updateAppointmentStatusInSupabase,
  fetchPrescriptionsFromSupabase,
  savePrescriptionToSupabase,
  fetchDepartmentsFromSupabase,
  fetchAuditLogsFromSupabase,
  saveAuditLogToSupabase,
  createBackupSnapshot,
  initDb
};
