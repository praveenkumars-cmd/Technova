import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { SearchInput } from '../../components/common/SearchInput';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { Check, X, Calendar, Clock, FilePlus, User } from 'lucide-react';
import { formatDate, getStatusBadgeVariant } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const ViewAppointments: React.FC = () => {
  const { appointments, approveAppointment, rejectAppointment } = useData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRejectId, setSelectedRejectId] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesTab = activeTab === 'all' || apt.status === activeTab;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabItems = [
    { id: 'all', label: 'All Appointments', count: appointments.length },
    { id: 'pending', label: 'Pending Approvals', count: appointments.filter((a) => a.status === 'pending').length },
    { id: 'approved', label: 'Confirmed', count: appointments.filter((a) => a.status === 'approved').length },
    { id: 'completed', label: 'Completed', count: appointments.filter((a) => a.status === 'completed').length },
    { id: 'rejected', label: 'Rejected', count: appointments.filter((a) => a.status === 'rejected').length },
  ];

  const handleConfirmReject = () => {
    if (selectedRejectId) {
      rejectAppointment(selectedRejectId, reason);
      setSelectedRejectId(null);
      setReason('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Consultation Schedule & Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your daily patient queue, approve incoming requests, and launch digital clinical tools.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<FilePlus className="w-4 h-4" />}
          onClick={() => navigate('/doctor/prescriptions/new')}
        >
          Create Prescription
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        <div className="w-full sm:w-72">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Filter by patient name or ID..." />
        </div>
      </Card>

      {/* Table View */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Appointment ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Date & Time Slot</TableHead>
            <TableHead>Visit Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason for Consultation</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                No appointments found matching search criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredAppointments.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                  {apt.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={apt.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={apt.patientName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{apt.patientName}</span>
                      <span className="text-[10px] text-slate-400">{apt.patientPhone || '+1 (555) 000-0000'}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(apt.date)}</span>
                    <span className="text-slate-500 dark:text-slate-400">{apt.timeSlot}</span>
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
                <TableCell className="max-w-xs truncate text-xs text-slate-600 dark:text-slate-300">
                  {apt.reason}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {apt.status === 'pending' && (
                      <>
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
                          onClick={() => setSelectedRejectId(apt.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {apt.status === 'approved' && (
                      <Button
                        variant="glow"
                        size="sm"
                        className="px-2.5 py-1 text-xs"
                        leftIcon={<FilePlus className="w-3.5 h-3.5" />}
                        onClick={() => navigate('/doctor/prescriptions/new')}
                      >
                        Prescribe
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Reject Modal */}
      <Modal
        isOpen={!!selectedRejectId}
        onClose={() => setSelectedRejectId(null)}
        title="Reject Appointment Request"
      >
        <div className="space-y-4">
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for cancellation or rejection..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedRejectId(null)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject}>Confirm Rejection</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
