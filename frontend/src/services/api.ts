import { httpRequest } from './apiClient';
import { User, UserRole, Appointment, HealthRecord, Prescription, AuditLog } from '../types';

export const authApi = {
  login: async (email: string, role: UserRole) => {
    return httpRequest<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  },
  getProfile: async () => {
    return httpRequest<User>('/auth/me');
  },
};

export const appointmentsApi = {
  getAll: async () => {
    return httpRequest<Appointment[]>('/appointments');
  },
  create: async (appointmentData: Partial<Appointment>) => {
    return httpRequest<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  updateStatus: async (id: string, status: string, reason?: string) => {
    return httpRequest<Appointment>(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason }),
    });
  },
};

export const prescriptionsApi = {
  getAll: async () => {
    return httpRequest<Prescription[]>('/prescriptions');
  },
  create: async (prescriptionData: Partial<Prescription>) => {
    return httpRequest<Prescription>('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
  },
};

export const healthRecordsApi = {
  getByPatientId: async (patientId: string) => {
    return httpRequest<HealthRecord>(`/health-records/${patientId}`);
  },
};

export const adminApi = {
  getAuditLogs: async () => {
    return httpRequest<AuditLog[]>('/admin/audit-logs');
  },
  triggerBackup: async () => {
    return httpRequest<{ success: boolean; snapshotId: string }>('/admin/backup', {
      method: 'POST',
    });
  },
};
