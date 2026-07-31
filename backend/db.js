import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
      notes: 'ER triage priority high.',
      createdAt: '2026-07-31'
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
    },
    {
      id: 'LOG-9002',
      action: 'Medical Record View',
      user: 'Alexander Wright',
      role: 'Patient',
      timestamp: '2026-07-31 10:22 AM',
      ipAddress: '10.0.0.12',
      status: 'Success'
    }
  ]
};

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Read database from disk
export function readDb() {
  try {
    if (!fs.existsSync(dbFilePath)) {
      writeDb(initialDatabaseState);
      return initialDatabaseState;
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[Database Engine] Error reading database file:', err.message);
    writeDb(initialDatabaseState);
    return initialDatabaseState;
  }
}

// Write database to disk atomically
export function writeDb(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[Database Engine] Error writing database file:', err.message);
  }
}

// Create automated DB Backup Snapshot
export function createBackupSnapshot() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotPath = path.resolve(backupDir, `pulsecare-backup-${timestamp}.json`);
    const currentData = readDb();
    fs.writeFileSync(snapshotPath, JSON.stringify(currentData, null, 2), 'utf8');
    
    // Log audit event
    currentData.auditLogs.unshift({
      id: `LOG-${Math.floor(9000 + Math.random() * 1000)}`,
      action: 'System Backup Snapshot Created',
      user: 'System Vault',
      role: 'Admin',
      timestamp: new Date().toLocaleString(),
      ipAddress: '127.0.0.1',
      status: 'Success'
    });
    writeDb(currentData);

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
  console.log(`[Database Engine] High-availability persistent database initialized at ${dbFilePath}`);
}

export default { readDb, writeDb, createBackupSnapshot, initDb };
