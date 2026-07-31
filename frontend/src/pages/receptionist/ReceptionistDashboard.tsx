import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Check, X, Plus, Download, Users, Building, Calendar, Clock, ListTodo } from 'lucide-react';
import { formatDate, getStatusBadgeVariant } from '../../utils/formatters';
import { useNotifications } from '../../context/NotificationContext';

export const ReceptionistDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, approveAppointment, rejectAppointment, dutyShifts } = useData();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const todayAppointments = appointments.filter((a) => a.date === '2026-08-01' || a.date === '2026-08-03');
  const pendingBookings = appointments.filter((a) => a.status === 'pending');
  const onDutyStaff = dutyShifts.filter((s) => s.status === 'On Duty');

  const handleExportCsv = () => {
    showToast('Export Successful', 'Exported admissions queue as CSV: admissions_queue_report.csv', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white p-6 sm:p-8 rounded-3xl shadow-soft-lg">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-soft-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-1">
              <Building className="w-3.5 h-3.5" />
              <span>{user?.department || 'Main Admissions Desk'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hospital Admissions & Desk Desk
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 mt-1">
              Welcome back, {user?.name}! You have <span className="font-bold underline">{pendingBookings.length} pending bookings</span> requiring receptionist approval.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            className="w-full sm:w-auto bg-white text-amber-900 hover:bg-amber-50 border-none font-bold"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/receptionist/schedule')}
          >
            Schedule Walk-In
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto border-white/40 text-white hover:bg-white/20"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportCsv}
          >
            Export Queue CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Patients"
          value={todayAppointments.length + 8}
          change="+15% Walk-ins"
          changeType="positive"
          icon={<Users className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
        />
        <StatCard
          title="Doctors On Duty"
          value={onDutyStaff.filter((s) => s.role.includes('Doctor')).length + 12}
          change="Active Shifts"
          changeType="positive"
          icon={<Building className="w-5 h-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />
        <StatCard
          title="Pending Bookings"
          value={pendingBookings.length}
          change="Action Req."
          changeType="warning"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingBookings.length}
          change="Review Queue"
          changeType="neutral"
          icon={<ListTodo className="w-5 h-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
        />
      </div>

      {/* Master Queue Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Admissions Master Appointments Desk
            </h3>
            <p className="text-xs text-slate-500">Live feed of incoming consultations & walk-ins</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/receptionist/appointments')}>
            View All Desk Queue
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apt ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor & Dept</TableHead>
              <TableHead>Date & Slot</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  {apt.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={apt.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={apt.patientName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{apt.patientName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{apt.doctorName}</span>
                    <span className="text-slate-500">{apt.department}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(apt.date)}</span>
                    <span className="text-slate-500">{apt.timeSlot}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={apt.type === 'Emergency' ? 'danger' : 'info'}>{apt.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(apt.status)} dot>
                    {apt.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {apt.status === 'pending' && (
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="success"
                        size="sm"
                        className="px-2 py-1 text-xs"
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                        onClick={() => approveAppointment(apt.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 py-1 text-xs text-red-600 border-red-200 dark:border-red-900/60"
                        leftIcon={<X className="w-3.5 h-3.5" />}
                        onClick={() => rejectAppointment(apt.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
