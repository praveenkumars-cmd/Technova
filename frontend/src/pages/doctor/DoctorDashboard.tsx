import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Alert } from '../../components/ui/Alert';
import { Modal } from '../../components/ui/Modal';
import { AppointmentTrendChart } from '../../components/charts/AppointmentTrendChart';
import { PatientGrowthChart } from '../../components/charts/PatientGrowthChart';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FilePlus,
  Search,
  Check,
  X,
  Stethoscope,
  ChevronRight,
  User,
  ShieldAlert,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, approveAppointment, rejectAppointment } = useData();
  const navigate = useNavigate();

  const [selectedRejectAptId, setSelectedRejectAptId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const todayStr = '2026-08-01'; // Mock today date

  const todayAppointments = appointments.filter((a) => a.date === '2026-08-01' || a.date === '2026-08-03');
  const pendingApprovals = appointments.filter((a) => a.status === 'pending');
  const completedConsultations = appointments.filter((a) => a.status === 'completed');
  const emergencyCases = appointments.filter((a) => a.type === 'Emergency');

  const handleConfirmReject = () => {
    if (selectedRejectAptId) {
      rejectAppointment(selectedRejectAptId, rejectionReason);
      setSelectedRejectAptId(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="space-[#1 shadow-sm] flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-glow-primary">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-soft-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-1">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{user?.department || 'Cardiology Center'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good Morning, {user?.name || 'Dr. Sarah Jenkins'}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              You have <span className="font-bold underline">{todayAppointments.length} appointments</span> scheduled for today and <span className="font-bold underline">{pendingApprovals.length} pending requests</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 border-none"
            leftIcon={<FilePlus className="w-4 h-4" />}
            onClick={() => navigate('/doctor/prescriptions/new')}
          >
            Create Prescription
          </Button>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      {emergencyCases.length > 0 && (
        <Alert type="danger" title="Active ER Emergency Triage Cases">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span>
              <strong className="font-bold">{emergencyCases.length} Critical ER cases</strong> require immediate attending physician review (e.g. Sophia Martinez - Palpitations).
            </span>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<ShieldAlert className="w-4 h-4" />}
              onClick={() => navigate('/doctor/emergencies')}
            >
              View ER Bay
            </Button>
          </div>
        </Alert>
      )}

      {/* Stat KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          change="+12%"
          changeType="positive"
          icon={<Calendar className="w-5 h-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          change="Action Req."
          changeType="warning"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
        />
        <StatCard
          title="Completed Consultations"
          value={completedConsultations.length + 24}
          change="+8%"
          changeType="positive"
          icon={<CheckCircle className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        />
        <StatCard
          title="Emergency Cases"
          value={emergencyCases.length}
          change="High Priority"
          changeType="negative"
          icon={<AlertTriangle className="w-5 h-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
        />
        <StatCard
          title="Upcoming Schedule"
          value="18 Slots"
          change="Open"
          changeType="neutral"
          icon={<Stethoscope className="w-5 h-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <CardHeader className="p-0 mb-4">
            <CardTitle>Daily Appointment Volume Trend</CardTitle>
            <p className="text-xs text-slate-500">Monthly consultation bookings & completed visits</p>
          </CardHeader>
          <AppointmentTrendChart />
        </Card>

        <Card className="p-5">
          <CardHeader className="p-0 mb-4">
            <CardTitle>Patient Growth & Retainage</CardTitle>
            <p className="text-xs text-slate-500">New first-time consultations vs returning patients</p>
          </CardHeader>
          <PatientGrowthChart />
        </Card>
      </div>

      {/* Pending Approvals Queue & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals List */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>Pending Appointment Approvals</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400">Review patient consultation requests</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/doctor/appointments')}>
                View All Queue
              </Button>
            </div>

            {pendingApprovals.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No pending appointment approvals right now!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                        alt={apt.patientName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{apt.patientName}</h4>
                          <Badge variant={apt.type === 'Emergency' ? 'danger' : 'info'}>{apt.type}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {formatDate(apt.date)} at <strong className="text-slate-700 dark:text-slate-300">{apt.timeSlot}</strong> • {apt.reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Button
                        variant="success"
                        size="sm"
                        leftIcon={<Check className="w-4 h-4" />}
                        onClick={() => approveAppointment(apt.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<X className="w-4 h-4" />}
                        onClick={() => setSelectedRejectAptId(apt.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Quick Patient History Lookup Card */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <CardTitle className="mb-1">Patient History Lookup</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Quickly view vitals, allergies, & past lab results.
            </p>

            <div className="space-y-3">
              <div
                onClick={() => navigate('/doctor/health-records')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h5 className="font-bold text-xs">Alexander Wright</h5>
                    <p className="text-[10px] text-slate-500">Blood A+ • 34 Yrs Male</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => navigate('/doctor/health-records')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h5 className="font-bold text-xs">Sophia Martinez</h5>
                    <p className="text-[10px] text-slate-500">Blood O+ • 28 Yrs Female</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-6"
            leftIcon={<Search className="w-4 h-4" />}
            onClick={() => navigate('/doctor/health-records')}
          >
            Search Master Health Records
          </Button>
        </Card>
      </div>

      {/* Reject Reason Dialog Modal */}
      <Modal
        isOpen={!!selectedRejectAptId}
        onClose={() => setSelectedRejectAptId(null)}
        title="Reject Appointment Request"
        description="Provide a reason for declining this appointment booking."
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">Rejection Reason</label>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Emergency surgery scheduled at this time slot."
              className="w-full mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setSelectedRejectAptId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject}>
              Confirm Reject
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
