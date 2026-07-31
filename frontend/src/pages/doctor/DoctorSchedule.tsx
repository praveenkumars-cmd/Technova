import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar } from '../../components/ui/Calendar';
import { Badge } from '../../components/ui/Badge';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const DoctorSchedule: React.FC = () => {
  const { showToast } = useNotifications();
  const [selectedDate, setSelectedDate] = useState('2026-08-03');

  const [availableSlots, setAvailableSlots] = useState([
    { id: '1', time: '09:00 AM', status: 'Booked', patient: 'Alexander Wright' },
    { id: '2', time: '09:30 AM', status: 'Booked', patient: 'Sophia Martinez' },
    { id: '3', time: '10:00 AM', status: 'Available', patient: null },
    { id: '4', time: '10:30 AM', status: 'Available', patient: null },
    { id: '5', time: '02:00 PM', status: 'Booked', patient: 'David Kim' },
    { id: '6', time: '02:30 PM', status: 'Available', patient: null },
    { id: '7', time: '03:00 PM', status: 'Available', patient: null },
    { id: '8', time: '04:00 PM', status: 'Blocked', patient: null },
  ]);

  const toggleSlotStatus = (id: string) => {
    setAvailableSlots((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          if (s.status === 'Booked') return s;
          const nextStatus = s.status === 'Available' ? 'Blocked' : 'Available';
          showToast('Slot Preference Saved', `Slot ${s.time} set to ${nextStatus}`, 'info');
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Shift Allocation & Availability Calendar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure your consultation hours, block personal leave, and view booked slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Picker */}
        <div className="lg:col-span-1">
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>

        {/* Slot Grid */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Time Slots for {selectedDate}
              </h3>
              <p className="text-xs text-slate-500">Click available slots to toggle Block / Open state</p>
            </div>
            <Badge variant="primary">Cardiology Department</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => toggleSlotStatus(slot.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  slot.status === 'Booked'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800'
                    : slot.status === 'Available'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100/60'
                    : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <div>
                    <h4 className="font-bold text-sm">{slot.time}</h4>
                    <p className="text-xs text-slate-500">
                      {slot.patient ? `Patient: ${slot.patient}` : slot.status}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    slot.status === 'Booked'
                      ? 'primary'
                      : slot.status === 'Available'
                      ? 'success'
                      : 'neutral'
                  }
                >
                  {slot.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
