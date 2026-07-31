import express from 'express';
import cors from 'cors';
import { initDb, readDb, writeDb, createBackupSnapshot } from './db.js';

const app = express();
const PORT = 5000;

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

// Health & System Status Endpoint
app.get('/api/health', (req, res) => {
  const dbData = readDb();
  res.json({
    status: 'OK',
    server: 'PulseCare Enterprise Express Backend',
    database: 'Persistent JSON DB (backend/pulsecare-db.json)',
    uptimeSeconds: Math.floor(process.uptime()),
    stats: {
      totalUsers: dbData.users.length,
      totalAppointments: dbData.appointments.length,
      totalPrescriptions: dbData.prescriptions.length,
      totalAuditLogs: dbData.auditLogs.length
    }
  });
});

// ------------------------------------------------------------------
// AUTHENTICATION ENDPOINTS
// ------------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Validation Error: User role parameter is required.' });
  }

  const dbData = readDb();
  const targetEmail = email || `${role}@pulsecare.com`;
  let user = dbData.users.find((u) => u.email === targetEmail || u.role === role);

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
    dbData.users.push(user);
  }

  // Record audit log
  dbData.auditLogs.unshift({
    id: `LOG-${Math.floor(9000 + Math.random() * 1000)}`,
    action: `${user.role.toUpperCase()} Authentication`,
    user: user.name,
    role: user.role,
    timestamp: new Date().toLocaleString(),
    ipAddress: req.ip || '127.0.0.1',
    status: 'Success'
  });

  writeDb(dbData);

  res.json({
    token: `pulse-jwt-${Date.now()}-secure-token`,
    user
  });
});

// ------------------------------------------------------------------
// APPOINTMENTS ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/appointments', (req, res) => {
  const dbData = readDb();
  res.json(dbData.appointments);
});

app.post('/api/appointments', (req, res) => {
  const { doctorName, department, date, timeSlot } = req.body;

  if (!doctorName || !date || !timeSlot) {
    return res.status(400).json({ error: 'Validation Error: doctorName, date, and timeSlot are required fields.' });
  }

  const dbData = readDb();
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

  dbData.appointments.unshift(newApt);
  writeDb(dbData);

  res.status(201).json(newApt);
});

app.patch('/api/appointments/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, reason } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Validation Error: Status parameter is required.' });
  }

  const dbData = readDb();
  const apt = dbData.appointments.find((a) => a.id === id);

  if (!apt) {
    return res.status(404).json({ error: `Appointment ID ${id} not found in database.` });
  }

  apt.status = status;
  if (reason) apt.rejectionReason = reason;

  writeDb(dbData);
  res.json(apt);
});

// ------------------------------------------------------------------
// PRESCRIPTIONS ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/prescriptions', (req, res) => {
  const dbData = readDb();
  res.json(dbData.prescriptions);
});

app.post('/api/prescriptions', (req, res) => {
  const { patientName, doctorName, diagnosis, medications } = req.body;

  if (!patientName || !diagnosis || !medications || !Array.isArray(medications)) {
    return res.status(400).json({ error: 'Validation Error: patientName, diagnosis, and medications array are required.' });
  }

  const dbData = readDb();
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

  dbData.prescriptions.unshift(newPx);
  writeDb(dbData);

  res.status(201).json(newPx);
});

// ------------------------------------------------------------------
// DIRECTORY & ADMIN ENDPOINTS
// ------------------------------------------------------------------
app.get('/api/departments', (req, res) => {
  const dbData = readDb();
  res.json(dbData.departments);
});

app.get('/api/admin/audit-logs', (req, res) => {
  const dbData = readDb();
  res.json(dbData.auditLogs);
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
  console.log(`🗄️ Database File: backend/pulsecare-db.json`);
  console.log(`💾 Backup Dir:    backend/backups/`);
  console.log(`📡 Base Endpoint: http://localhost:${PORT}/api`);
  console.log(`==================================================\n`);
});
