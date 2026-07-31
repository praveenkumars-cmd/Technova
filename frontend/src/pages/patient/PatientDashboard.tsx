import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Timeline } from '../../components/ui/Timeline';
import {
  Calendar,
  Clock,
  FileSpreadsheet,
  FileText,
  PlusCircle,
  CreditCard,
  UserCheck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, healthRecord, prescriptions } = useData();
  const navigate = useNavigate();

  const upcomingAppointments = appointments.filter((a) => a.status === 'approved' || a.status === 'pending');
  const pastAppointments = appointments.filter((a) => a.status === 'completed');
  const nextAppointment = upcomingAppointments[0];

  const timelinePreviewItems = [
    {
      id: 't1',
      date: '2026-07-28',
      title: 'Digital Prescription Issued (RX-7721)',
      description: 'Dr. Sarah Jenkins issued Lisinopril 10mg & Atorvastatin 20mg for hypertension.',
      category: 'Prescription',
      status: 'Completed' as const,
    },
    {
      id: 't2',
      date: '2026-07-20',
      title: 'Lipid & Cholesterol Lab Test',
      description: 'Comprehensive blood panel results uploaded - All values within normal bounds.',
      category: 'Lab Report',
      status: 'Completed' as const,
    },
    {
      id: 't3',
      date: '2026-07-15',
      title: 'Neurology Consultation',
      description: 'Completed consultation with Dr. Robert Chen for cervical tension headaches.',
      category: 'Consultation',
      status: 'Completed' as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 rounded-3xl shadow-soft-lg">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-soft-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Patient Hospital ID: {user?.hospitalId || 'PAT-10942'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, {user?.name || 'Alexander'}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              {nextAppointment
                ? `Your next appointment is on ${formatDate(nextAppointment.date)} at ${nextAppointment.timeSlot}`
                : 'No upcoming appointments booked.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            className="w-full sm:w-auto bg-white text-emerald-900 hover:bg-emerald-50 border-none font-bold"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={() => navigate('/patient/book-appointment')}
          >
            Book Appointment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Next Appointment"
          value={nextAppointment ? formatDate(nextAppointment.date) : 'None'}
          change={nextAppointment?.timeSlot || 'Book Now'}
          changeType="positive"
          icon={<Calendar className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        />
        <StatCard
          title="Previous Visits"
          value={pastAppointments.length + 5}
          change="Completed"
          changeType="neutral"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />
        <StatCard
          title="Medical Records"
          value={healthRecord.labReports.length + healthRecord.scanReports.length}
          change="Files Ready"
          changeType="positive"
          icon={<FileSpreadsheet className="w-5 h-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
        />
        <StatCard
          title="Prescriptions"
          value={prescriptions.length}
          change="Active digital"
          changeType="positive"
          icon={<FileText className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
        />
        <StatCard
          title="Pending Requests"
          value={upcomingAppointments.filter((a) => a.status === 'pending').length}
          change="Reviewing"
          changeType="warning"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
        />
      </div>

      {/* Next Appointment Hero Card + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Upcoming Appointment */}
        <Card className="lg:col-span-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Upcoming Consultation</CardTitle>
              <Badge variant="success">Confirmed</Badge>
            </div>

            {nextAppointment ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={nextAppointment.doctorAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'}
                      alt={nextAppointment.doctorName}
                      className="w-12 h-12 rounded-2xl object-cover border border-emerald-300"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {nextAppointment.doctorName}
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                        {nextAppointment.department}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-400">Date:</span>
                      <span className="font-bold">{formatDate(nextAppointment.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-400">Time Slot:</span>
                      <span className="font-bold">{nextAppointment.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-400">Type:</span>
                      <span className="font-bold">{nextAppointment.type}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300">
                  <strong className="font-bold">Reason for Visit: </strong>
                  {nextAppointment.reason}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                No upcoming consultations scheduled.
              </div>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <Button
              variant="glow"
              size="sm"
              className="w-full"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={() => navigate('/patient/book-appointment')}
            >
              Book New Appointment
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-red-600 border-red-200 dark:border-red-900/60"
              leftIcon={<ShieldAlert className="w-4 h-4" />}
              onClick={() => navigate('/patient/book-appointment?emergency=true')}
            >
              Book Emergency ER Visit
            </Button>
          </div>
        </Card>

        {/* Medical History Timeline Teaser */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>Recent Medical Care Timeline</CardTitle>
                <p className="text-xs text-slate-500">Chronological history of consultations and lab tests</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient/timeline')}>
                Full Medical Timeline <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <Timeline items={timelinePreviewItems} />
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need copies of past lab reports?</span>
            <Button variant="secondary" size="sm" onClick={() => navigate('/patient/records')}>
              View All Records
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
