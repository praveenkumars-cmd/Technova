import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, HealthRecord, Prescription, DutyShift } from '../types';
import { initialAppointments, mockHealthRecord, mockDutyShifts } from '../data/mockData';
import { useNotifications } from './NotificationContext';
import { appointmentsApi, prescriptionsApi, healthRecordsApi } from '../services/api';

interface DataContextType {
  appointments: Appointment[];
  healthRecord: HealthRecord;
  prescriptions: Prescription[];
  dutyShifts: DutyShift[];
  addAppointment: (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  approveAppointment: (id: string) => Promise<void>;
  rejectAppointment: (id: string, reason?: string) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  addPrescription: (px: Omit<Prescription, 'id' | 'date'>) => Promise<void>;
  toggleShiftStatus: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [healthRecord, setHealthRecord] = useState<HealthRecord>(mockHealthRecord);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockHealthRecord.prescriptions);
  const [dutyShifts, setDutyShifts] = useState<DutyShift[]>(mockDutyShifts);

  const { showToast, addNotification } = useNotifications();

  // Try fetching live appointments from backend API on mount
  useEffect(() => {
    async function loadBackendData() {
      const aptRes = await appointmentsApi.getAll();
      if (aptRes.data && aptRes.data.length > 0) {
        setAppointments(aptRes.data);
      }

      const pxRes = await prescriptionsApi.getAll();
      if (pxRes.data && pxRes.data.length > 0) {
        setPrescriptions(pxRes.data);
      }
    }
    loadBackendData();
  }, []);

  const addAppointment = async (aptData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const tempId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApt: Appointment = {
      ...aptData,
      id: tempId,
      status: aptData.type === 'Emergency' ? 'approved' : 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Optimistic UI update
    setAppointments((prev) => [newApt, ...prev]);

    // Send to backend API
    const res = await appointmentsApi.create(newApt);
    if (res.data) {
      setAppointments((prev) => prev.map((a) => (a.id === tempId ? res.data! : a)));
    }

    showToast(
      'Appointment Booked!',
      `Scheduled with ${newApt.doctorName} for ${newApt.date} at ${newApt.timeSlot}`,
      'success'
    );

    addNotification({
      title: 'New Appointment Booking',
      message: `${newApt.patientName} requested an appointment with ${newApt.doctorName}`,
      type: 'reminder',
      targetRole: 'doctor',
    });
  };

  const approveAppointment = async (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'approved' } : apt))
    );

    await appointmentsApi.updateStatus(id, 'approved');

    const targetApt = appointments.find((a) => a.id === id);
    showToast('Appointment Approved', `Appointment ${id} has been confirmed.`, 'success');

    if (targetApt) {
      addNotification({
        title: 'Appointment Approved',
        message: `Your appointment with ${targetApt.doctorName} on ${targetApt.date} was approved.`,
        type: 'approved',
        targetRole: 'patient',
      });
    }
  };

  const rejectAppointment = async (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: 'rejected', rejectionReason: reason || 'Slot unavailable' } : apt
      )
    );

    await appointmentsApi.updateStatus(id, 'rejected', reason);
    showToast('Appointment Rejected', `Appointment ${id} was rejected.`, 'warning');
  };

  const cancelAppointment = async (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );

    await appointmentsApi.updateStatus(id, 'cancelled');
    showToast('Appointment Cancelled', `Appointment ${id} has been cancelled.`, 'info');
  };

  const addPrescription = async (pxData: Omit<Prescription, 'id' | 'date'>) => {
    const tempId = `RX-${Math.floor(7000 + Math.random() * 2000)}`;
    const newPx: Prescription = {
      ...pxData,
      id: tempId,
      date: new Date().toISOString().split('T')[0],
    };

    setPrescriptions((prev) => [newPx, ...prev]);
    setHealthRecord((prev) => ({
      ...prev,
      prescriptions: [newPx, ...prev.prescriptions],
    }));

    await prescriptionsApi.create(newPx);

    showToast('Prescription Generated', `Prescription created for ${newPx.patientName}`, 'success');

    addNotification({
      title: 'New Prescription Digital Copy',
      message: `Dr. ${newPx.doctorName} generated a digital prescription for you.`,
      type: 'prescription',
      targetRole: 'patient',
    });
  };

  const toggleShiftStatus = (id: string) => {
    setDutyShifts((prev) =>
      prev.map((shift) =>
        shift.id === id
          ? {
              ...shift,
              status: shift.status === 'On Duty' ? 'Scheduled' : 'On Duty',
            }
          : shift
      )
    );
    showToast('Shift Roster Updated', 'Staff duty status updated successfully', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        appointments,
        healthRecord,
        prescriptions,
        dutyShifts,
        addAppointment,
        approveAppointment,
        rejectAppointment,
        cancelAppointment,
        addPrescription,
        toggleShiftStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
