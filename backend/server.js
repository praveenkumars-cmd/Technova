import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  initDb,
  readDb,
  writeDb,
  fetchAppointmentsFromSupabase,
  saveAppointmentToSupabase,
  updateAppointmentStatusInSupabase,
  fetchPrescriptionsFromSupabase,
  savePrescriptionToSupabase,
  fetchDepartmentsFromSupabase,
  fetchAuditLogsFromSupabase,
  saveAuditLogToSupabase,
  fetchUsersFromSupabase,
  createBackupSnapshot
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize Persistent Database Engine
initDb();

// Request Audit & Performance Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[PulseCare API ${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Root API Endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to PulseCare Enterprise API Engine',
    version: '1.0.0',
    status: 'Active',
    database: 'Supabase PostgreSQL'
  });
});

// Health & System Status Endpoint
app.get('/api/health', async (req, res) => {
  const users = await fetchUsersFromSupabase();
  const appointments = await fetchAppointmentsFromSupabase();
  const prescriptions = await fetchPrescriptionsFromSupabase();
  const auditLogs = await fetchAuditLogsFromSupabase();

  res.json({
    status: 'OK',
    server: 'PulseCare Enterprise Express Backend',
    database: 'Supabase PostgreSQL + Local Persistence Engine',
    uptimeSeconds: Math.floor(process.uptime()),
    stats: {
      totalUsers: users.length,
      totalAppointments: appointments.length,
      totalPrescriptions: prescriptions.length,
      totalAuditLogs: auditLogs.length
    }
  });
});

// ------------------------------------------------------------------
// AUTHENTICATION ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/auth/me', async (req, res) => {
  const users = await fetchUsersFromSupabase();
  const defaultUser = users[0] || {
    id: 'pat-1',
    name: 'Alexander Wright',
    email: 'patient@pulsecare.com',
    role: 'patient'
  };
  res.json(defaultUser);
});

app.post('/api/auth/login', async (req, res) => {
  const { email, role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Validation Error: User role parameter is required.' });
  }

  const users = await fetchUsersFromSupabase();
  const targetEmail = email || `${role}@pulsecare.com`;
  let user = users.find((u) => u.email === targetEmail || u.role === role);

  if (!user) {
    user = {
      id: `${role}-${Date.now()}`,
      name:
        role === 'doctor'
          ? 'Dr. Sarah Jenkins, MD'
          : role === 'patient'
          ? 'Alexander Wright'
          : role === 'receptionist'
          ? 'Elena Rostova'
          : 'Marcus Vance',
      email: targetEmail,
      role,
      avatar:
        role === 'doctor'
          ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      department: role === 'doctor' ? 'Cardiology' : 'Main Desk',
      hospitalId: `${role.toUpperCase()}-9901`,
    };
  }

  // Record audit log
  const auditLog = {
    id: `LOG-${Math.floor(9000 + Math.random() * 1000)}`,
    action: `${user.role.toUpperCase()} Authentication`,
    user: user.name,
    role: user.role,
    timestamp: new Date().toLocaleString(),
    ipAddress: req.ip || '127.0.0.1',
    status: 'Success'
  };

  await saveAuditLogToSupabase(auditLog);

  // Sync to local fallback DB
  const localDb = readDb();
  localDb.auditLogs.unshift(auditLog);
  writeDb(localDb);

  res.json({
    token: `pulse-jwt-${Date.now()}-secure-token`,
    user
  });
});

// ------------------------------------------------------------------
// APPOINTMENTS ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/appointments', async (req, res) => {
  const appointments = await fetchAppointmentsFromSupabase();
  res.json(appointments);
});

app.post('/api/appointments', async (req, res) => {
  const { doctorName, department, date, timeSlot } = req.body;

  if (!doctorName || !date || !timeSlot) {
    return res.status(400).json({ error: 'Validation Error: doctorName, date, and timeSlot are required fields.' });
  }

  const id = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
  const status = req.body.type === 'Emergency' ? 'approved' : 'pending';

  const newApt = {
    id,
    patientId: req.body.patientId || 'pat-1',
    patientName: req.body.patientName || 'Alexander Wright',
    patientAvatar: req.body.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    patientPhone: req.body.patientPhone || '+1 (555) 876-5432',
    doctorId: req.body.doctorId || 'doc-1',
    doctorName,
    doctorAvatar: req.body.doctorAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    department: department || 'General Medicine',
    date,
    timeSlot,
    type: req.body.type || 'In-Person',
    status,
    reason: req.body.reason || 'Medical consultation',
    notes: null,
    createdAt: new Date().toISOString().split('T')[0]
  };

  await saveAppointmentToSupabase(newApt);

  // Sync local JSON
  const localDb = readDb();
  localDb.appointments.unshift(newApt);
  writeDb(localDb);

  res.status(201).json(newApt);
});

app.patch('/api/appointments/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, reason } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Validation Error: Status parameter is required.' });
  }

  await updateAppointmentStatusInSupabase(id, status, reason);

  const localDb = readDb();
  const apt = localDb.appointments.find((a) => a.id === id);
  if (apt) {
    apt.status = status;
    if (reason) apt.rejectionReason = reason;
    writeDb(localDb);
    res.json(apt);
  } else {
    res.json({ id, status, rejectionReason: reason });
  }
});

// ------------------------------------------------------------------
// PRESCRIPTIONS ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/prescriptions', async (req, res) => {
  const prescriptions = await fetchPrescriptionsFromSupabase();
  res.json(prescriptions);
});

app.post('/api/prescriptions', async (req, res) => {
  const { patientName, doctorName, diagnosis, medications } = req.body;

  if (!patientName || !diagnosis || !medications || !Array.isArray(medications)) {
    return res.status(400).json({ error: 'Validation Error: patientName, diagnosis, and medications array are required.' });
  }

  const newPx = {
    id: `RX-${Math.floor(7000 + Math.random() * 2000)}`,
    appointmentId: req.body.appointmentId || null,
    patientId: req.body.patientId || 'pat-1',
    patientName,
    doctorId: req.body.doctorId || 'doc-1',
    doctorName: doctorName || 'Dr. Sarah Jenkins',
    date: new Date().toISOString().split('T')[0],
    diagnosis,
    medications,
    instructions: req.body.instructions || 'Follow prescribed dosage schedule.'
  };

  await savePrescriptionToSupabase(newPx);

  const localDb = readDb();
  localDb.prescriptions.unshift(newPx);
  writeDb(localDb);

  res.status(201).json(newPx);
});

// ------------------------------------------------------------------
// ADDITIONAL UTILITY ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/shifts', (req, res) => {
  res.json([
    { id: 'SH-1', doctorName: 'Dr. Sarah Jenkins', shift: 'Morning (08:00 AM - 02:00 PM)', department: 'Cardiology', date: new Date().toISOString().split('T')[0] },
    { id: 'SH-2', doctorName: 'Dr. Robert Chen', shift: 'Evening (02:00 PM - 08:00 PM)', department: 'Neurology', date: new Date().toISOString().split('T')[0] }
  ]);
});

app.get('/api/emergencies', async (req, res) => {
  const appointments = await fetchAppointmentsFromSupabase();
  const emergencyList = appointments.filter((a) => a.type === 'Emergency');
  res.json(emergencyList);
});

app.get('/api/health-records/:patientId', async (req, res) => {
  const { patientId } = req.params;
  const prescriptions = await fetchPrescriptionsFromSupabase();
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patientId || patientId === 'pat-1');

  res.json({
    patientId,
    patientName: 'Alexander Wright',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension'],
    vitals: {
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6 °F',
      spo2: '99%'
    },
    prescriptions: patientPrescriptions
  });
});

// ------------------------------------------------------------------
// DIRECTORY & ADMIN ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/departments', async (req, res) => {
  const departments = await fetchDepartmentsFromSupabase();
  res.json(departments);
});

app.get('/api/admin/audit-logs', async (req, res) => {
  const auditLogs = await fetchAuditLogsFromSupabase();
  res.json(auditLogs);
});

app.post('/api/admin/backup', (req, res) => {
  const backupResult = createBackupSnapshot();
  if (backupResult.success) {
    res.json({
      message: 'Database backup snapshot created successfully in server storage.',
      snapshot: backupResult
    });
  } else {
    res.status(500).json({ error: 'Backup creation failed: ' + backupResult.error });
  }
});

// Centralized 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ error: `API endpoint ${req.method} ${req.originalUrl} not found.` });
});

// Centralized Server Error Handler
app.use((err, req, res, next) => {
  console.error('[PulseCare Error Handler]', err);
  res.status(500).json({ error: 'Internal Server Error: ' + err.message });
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 PulseCare Enterprise Backend API is LIVE on port ${PORT}`);
  console.log(`⚡ Database Mode: Supabase PostgreSQL + Fallback Local Persistence Engine`);
  console.log(`📡 Base Endpoint: http://localhost:${PORT}/api`);
  console.log(`==================================================\n`);
});
