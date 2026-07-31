import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public & Auth Pages
import { LandingPage } from '../pages/landing/LandingPage';
import { DoctorLogin } from '../pages/auth/DoctorLogin';
import { PatientLogin } from '../pages/auth/PatientLogin';
import { ReceptionistLogin } from '../pages/auth/ReceptionistLogin';
import { AdminLogin } from '../pages/auth/AdminLogin';
import { NotFoundPage } from '../pages/NotFoundPage';

// Doctor Pages
import { DoctorDashboard } from '../pages/doctor/DoctorDashboard';
import { ViewAppointments } from '../pages/doctor/ViewAppointments';
import { PatientHealthRecords } from '../pages/doctor/PatientHealthRecords';
import { CreatePrescription } from '../pages/doctor/CreatePrescription';
import { DoctorSchedule } from '../pages/doctor/DoctorSchedule';
import { DoctorProfile } from '../pages/doctor/DoctorProfile';
import { DoctorSettings } from '../pages/doctor/DoctorSettings';

// Patient Pages
import { PatientDashboard } from '../pages/patient/PatientDashboard';
import { BookAppointment } from '../pages/patient/BookAppointment';
import { AppointmentHistory } from '../pages/patient/AppointmentHistory';
import { HealthRecordsView } from '../pages/patient/HealthRecordsView';
import { PrescriptionsList } from '../pages/patient/PrescriptionsList';
import { MedicalTimelineView } from '../pages/patient/MedicalTimelineView';
import { PaymentPage } from '../pages/patient/PaymentPage';
import { PatientProfile } from '../pages/patient/PatientProfile';
import { PatientSettings } from '../pages/patient/PatientSettings';

// Receptionist Pages
import { ReceptionistDashboard } from '../pages/receptionist/ReceptionistDashboard';
import { ManageAppointments } from '../pages/receptionist/ManageAppointments';
import { ScheduleAppointment } from '../pages/receptionist/ScheduleAppointment';
import { ShiftScheduling } from '../pages/receptionist/ShiftScheduling';
import { PatientList } from '../pages/receptionist/PatientList';
import { DoctorList } from '../pages/receptionist/DoctorList';
import { NurseList } from '../pages/receptionist/NurseList';
import { StaffList } from '../pages/receptionist/StaffList';
import { ReceptionistProfile } from '../pages/receptionist/ReceptionistProfile';
import { ReceptionistSettings } from '../pages/receptionist/ReceptionistSettings';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ManageDoctors } from '../pages/admin/ManageDoctors';
import { ManagePatients } from '../pages/admin/ManagePatients';
import { ManageStaff } from '../pages/admin/ManageStaff';
import { ManageDepartments } from '../pages/admin/ManageDepartments';
import { UserRolesPermissions } from '../pages/admin/UserRolesPermissions';
import { ReportsAuditLogs } from '../pages/admin/ReportsAuditLogs';
import { SystemBackupUI } from '../pages/admin/SystemBackupUI';
import { AdminSettings } from '../pages/admin/AdminSettings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing & Auth Portals */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/doctor-login" element={<DoctorLogin />} />
      <Route path="/auth/patient-login" element={<PatientLogin />} />
      <Route path="/auth/receptionist-login" element={<ReceptionistLogin />} />
      <Route path="/auth/admin-login" element={<AdminLogin />} />

      {/* Doctor Module Routes (Wrapped in DashboardLayout) */}
      <Route path="/doctor/dashboard" element={<DashboardLayout><DoctorDashboard /></DashboardLayout>} />
      <Route path="/doctor/appointments" element={<DashboardLayout><ViewAppointments /></DashboardLayout>} />
      <Route path="/doctor/health-records" element={<DashboardLayout><PatientHealthRecords /></DashboardLayout>} />
      <Route path="/doctor/prescriptions/new" element={<DashboardLayout><CreatePrescription /></DashboardLayout>} />
      <Route path="/doctor/schedule" element={<DashboardLayout><DoctorSchedule /></DashboardLayout>} />
      <Route path="/doctor/emergencies" element={<DashboardLayout><DoctorDashboard /></DashboardLayout>} />
      <Route path="/doctor/profile" element={<DashboardLayout><DoctorProfile /></DashboardLayout>} />
      <Route path="/doctor/settings" element={<DashboardLayout><DoctorSettings /></DashboardLayout>} />

      {/* Patient Module Routes */}
      <Route path="/patient/dashboard" element={<DashboardLayout><PatientDashboard /></DashboardLayout>} />
      <Route path="/patient/book-appointment" element={<DashboardLayout><BookAppointment /></DashboardLayout>} />
      <Route path="/patient/appointments" element={<DashboardLayout><AppointmentHistory /></DashboardLayout>} />
      <Route path="/patient/records" element={<DashboardLayout><HealthRecordsView /></DashboardLayout>} />
      <Route path="/patient/prescriptions" element={<DashboardLayout><PrescriptionsList /></DashboardLayout>} />
      <Route path="/patient/timeline" element={<DashboardLayout><MedicalTimelineView /></DashboardLayout>} />
      <Route path="/patient/payment" element={<DashboardLayout><PaymentPage /></DashboardLayout>} />
      <Route path="/patient/profile" element={<DashboardLayout><PatientProfile /></DashboardLayout>} />
      <Route path="/patient/settings" element={<DashboardLayout><PatientSettings /></DashboardLayout>} />

      {/* Receptionist Module Routes */}
      <Route path="/receptionist/dashboard" element={<DashboardLayout><ReceptionistDashboard /></DashboardLayout>} />
      <Route path="/receptionist/appointments" element={<DashboardLayout><ManageAppointments /></DashboardLayout>} />
      <Route path="/receptionist/schedule" element={<DashboardLayout><ScheduleAppointment /></DashboardLayout>} />
      <Route path="/receptionist/shifts" element={<DashboardLayout><ShiftScheduling /></DashboardLayout>} />
      <Route path="/receptionist/patients" element={<DashboardLayout><PatientList /></DashboardLayout>} />
      <Route path="/receptionist/doctors" element={<DashboardLayout><DoctorList /></DashboardLayout>} />
      <Route path="/receptionist/staff" element={<DashboardLayout><StaffList /></DashboardLayout>} />
      <Route path="/receptionist/profile" element={<DashboardLayout><ReceptionistProfile /></DashboardLayout>} />
      <Route path="/receptionist/settings" element={<DashboardLayout><ReceptionistSettings /></DashboardLayout>} />

      {/* Admin Module Routes */}
      <Route path="/admin/dashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/doctors" element={<DashboardLayout><ManageDoctors /></DashboardLayout>} />
      <Route path="/admin/patients" element={<DashboardLayout><ManagePatients /></DashboardLayout>} />
      <Route path="/admin/staff" element={<DashboardLayout><ManageStaff /></DashboardLayout>} />
      <Route path="/admin/departments" element={<DashboardLayout><ManageDepartments /></DashboardLayout>} />
      <Route path="/admin/permissions" element={<DashboardLayout><UserRolesPermissions /></DashboardLayout>} />
      <Route path="/admin/audit-logs" element={<DashboardLayout><ReportsAuditLogs /></DashboardLayout>} />
      <Route path="/admin/backup" element={<DashboardLayout><SystemBackupUI /></DashboardLayout>} />
      <Route path="/admin/profile" element={<DashboardLayout><DoctorProfile /></DashboardLayout>} />
      <Route path="/admin/settings" element={<DashboardLayout><AdminSettings /></DashboardLayout>} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
