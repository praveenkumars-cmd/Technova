import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { mockDoctors } from '../../data/mockData';
import { CalendarCheck, ArrowLeft } from 'lucide-react';

export const ScheduleAppointment: React.FC = () => {
  const { addAppointment } = useData();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState('Walk-In Patient');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 999-8888');
  const [department, setDepartment] = useState('Cardiology');
  const [doctorId, setDoctorId] = useState('doc-1');
  const [date, setDate] = useState('2026-08-01');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [reason, setReason] = useState('Walk-in triage evaluation.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = mockDoctors.find((d) => d.id === doctorId) || mockDoctors[0];
    addAppointment({
      patientId: `pat-${Date.now()}`,
      patientName,
      patientPhone,
      doctorId: doc.id,
      doctorName: doc.name,
      department,
      date,
      timeSlot,
      type: 'In-Person',
      reason,
    });
    navigate('/receptionist/dashboard');
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/receptionist/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Schedule Walk-In Patient Consultation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Admissions Desk walk-in registration form.
          </p>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Walk-In Patient Full Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
            <Input label="Contact Phone Number" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Select Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              options={[
                { label: 'Cardiology', value: 'Cardiology' },
                { label: 'Neurology', value: 'Neurology' },
                { label: 'Orthopedics', value: 'Orthopedics' },
                { label: 'Pediatrics', value: 'Pediatrics' },
              ]}
            />

            <Select
              label="Attending Doctor"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              options={mockDoctors.map((d) => ({ label: `${d.name} (${d.department})`, value: d.id }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <Select
              label="Available Time Slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              options={[
                { label: '09:00 AM', value: '09:00 AM' },
                { label: '10:00 AM', value: '10:00 AM' },
                { label: '11:30 AM', value: '11:30 AM' },
                { label: '02:00 PM', value: '02:00 PM' },
                { label: '04:00 PM', value: '04:00 PM' },
              ]}
            />
          </div>

          <Textarea label="Reason for Visit" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} required />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/receptionist/dashboard')}>Cancel</Button>
            <Button type="submit" variant="secondary" leftIcon={<CalendarCheck className="w-4 h-4" />}>Confirm Walk-In Booking</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
