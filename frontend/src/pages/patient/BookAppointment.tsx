import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar } from '../../components/ui/Calendar';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { mockDoctors, mockDepartments } from '../../data/mockData';
import { AppointmentType } from '../../types';
import {
  CalendarCheck,
  Building2,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Star,
  ArrowRight,
  ArrowLeft,
  Video,
  User,
  PhoneCall,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const BookAppointment: React.FC = () => {
  const { user } = useAuth();
  const { addAppointment } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEmergencyParam = searchParams.get('emergency') === 'true';

  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedDept, setSelectedDept] = useState(isEmergencyParam ? 'Emergency Medicine' : 'Cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState('doc-1');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:30 AM');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(
    isEmergencyParam ? 'Emergency' : 'In-Person'
  );
  const [reason, setReason] = useState(
    isEmergencyParam
      ? 'Emergency Triage: Acute chest tightness & palpitations onset 1 hour ago.'
      : 'Quarterly cardiovascular checkup & ECG review.'
  );

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const availableDoctors = mockDoctors.filter(
    (d) => selectedDept === 'All' || d.department.toLowerCase() === selectedDept.toLowerCase()
  );

  const selectedDoctor = mockDoctors.find((d) => d.id === selectedDoctorId) || mockDoctors[0];

  const handleConfirmBooking = () => {
    addAppointment({
      patientId: user?.id || 'pat-1',
      patientName: user?.name || 'Alexander Wright',
      patientAvatar: user?.avatar,
      patientPhone: user?.phone || '+1 (555) 876-5432',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorAvatar: selectedDoctor.avatar,
      department: selectedDept,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      type: appointmentType,
      reason,
    });
    setIsConfirmModalOpen(false);
    navigate('/patient/dashboard');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Book Specialist Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select date, department, physician, and preferred time slot for your visit.
        </p>
      </div>

      {/* Emergency Alert Banner if Emergency flow */}
      {isEmergencyParam && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold">Emergency Triage Priority Activated:</strong> Your request will bypass standard queues and alert attending ER personnel immediately.
          </div>
        </div>
      )}

      {/* Progress Step Indicator */}
      <Card className="p-4 flex items-center justify-between overflow-x-auto no-scrollbar">
        {[
          { num: 1, title: 'Date & Dept' },
          { num: 2, title: 'Physician' },
          { num: 3, title: 'Time Slot' },
          { num: 4, title: 'Type & Reason' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2 px-3 py-1">
            <div
              className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                step >= s.num
                  ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-soft-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {s.num}
            </div>
            <span className={`text-xs font-semibold whitespace-nowrap ${step >= s.num ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </Card>

      {/* Step 1: Date & Department */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <CardTitle className="mb-3">Step 1: Select Consultation Date</CardTitle>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              minDate={new Date().toISOString().split('T')[0]}
            />
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <div>
              <CardTitle className="mb-3">Select Medical Department</CardTitle>
              <div className="space-y-2">
                {mockDepartments.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.name)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedDept === dept.name
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 font-bold'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">{dept.name}</h4>
                        <p className="text-[10px] text-slate-400">{dept.doctorCount} Doctors Available</p>
                      </div>
                    </div>
                    {selectedDept === dept.name && <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="glow"
              size="md"
              className="w-full mt-6"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(2)}
            >
              Continue to Doctor Selection
            </Button>
          </Card>
        </div>
      )}

      {/* Step 2: Doctor Selection */}
      {step === 2 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Step 2: Choose Attending Physician ({selectedDept})</CardTitle>
              <p className="text-xs text-slate-500">Select physician based on experience and ratings</p>
            </div>
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(1)}>
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableDoctors.length === 0 ? (
              <div className="col-span-2 text-center py-8 text-slate-500 text-xs">
                No doctors found for department {selectedDept}. Selecting default specialists.
              </div>
            ) : (
              availableDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedDoctorId === doc.id
                      ? 'bg-blue-50/80 dark:bg-blue-950/70 border-blue-600 dark:border-blue-500 shadow-soft-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{doc.name}</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{doc.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{doc.rating} ({doc.reviews} reviews) • {doc.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Consultation Fee: <strong className="text-slate-900 dark:text-slate-100">{doc.fee}</strong></span>
                    {selectedDoctorId === doc.id && <Badge variant="primary">Selected</Badge>}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant="glow"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(3)}
            >
              Continue to Time Slot
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Time Slot Selection */}
      {step === 3 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Step 3: Select Available Time Slot</CardTitle>
              <p className="text-xs text-slate-500">Consultation with {selectedDoctor.name} on {formatDate(selectedDate)}</p>
            </div>
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(2)}>
              Back
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {['09:00 AM', '09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '02:30 PM', '04:00 PM', '04:30 PM'].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTimeSlot(slot)}
                className={`p-4 rounded-2xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                  selectedTimeSlot === slot
                    ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-soft-md border-blue-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{slot}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              variant="glow"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(4)}
            >
              Continue to Visit Details
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Visit Type & Reason */}
      {step === 4 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Step 4: Visit Type & Reason</CardTitle>
              <p className="text-xs text-slate-500">Finalize consultation format and details</p>
            </div>
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(3)}>
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { type: 'In-Person', icon: <User className="w-5 h-5 text-blue-500" />, label: 'In-Person Visit', desc: 'At Hospital Pavilion' },
              { type: 'Teleconsultation', icon: <Video className="w-5 h-5 text-purple-500" />, label: 'Teleconsultation', desc: 'HD Video Call' },
              { type: 'Emergency', icon: <PhoneCall className="w-5 h-5 text-red-500" />, label: 'ER Emergency Visit', desc: 'Immediate Triage' },
            ].map((item) => (
              <div
                key={item.type}
                onClick={() => setAppointmentType(item.type as AppointmentType)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  appointmentType === item.type
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                {item.icon}
                <h4 className="font-bold text-sm">{item.label}</h4>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <Textarea
            label="Reason for Visit & Symptoms"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            required
          />

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="glow"
              size="lg"
              leftIcon={<CalendarCheck className="w-5 h-5" />}
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Review & Confirm Booking
            </Button>
          </div>
        </Card>
      )}

      {/* Confirmation Dialog Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Appointment Booking"
        description="Please review your consultation details before submitting."
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400">Doctor:</span>
              <span className="font-bold">{selectedDoctor.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="font-bold">{selectedDept}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date & Slot:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{formatDate(selectedDate)} at {selectedTimeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Visit Format:</span>
              <Badge variant="info">{appointmentType}</Badge>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsConfirmModalOpen(false)}>
              Make Edits
            </Button>
            <Button variant="success" size="sm" onClick={handleConfirmBooking}>
              Confirm & Book Slot
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
