import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { SearchInput } from '../../components/common/SearchInput';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Check, X, Plus } from 'lucide-react';
import { formatDate, getStatusBadgeVariant } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const ManageAppointments: React.FC = () => {
  const { appointments, approveAppointment, rejectAppointment } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesTab = activeTab === 'all' || apt.status === activeTab;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabItems = [
    { id: 'all', label: 'All Admissions', count: appointments.length },
    { id: 'pending', label: 'Pending Approvals', count: appointments.filter((a) => a.status === 'pending').length },
    { id: 'approved', label: 'Approved', count: appointments.filter((a) => a.status === 'approved').length },
    { id: 'completed', label: 'Completed', count: appointments.filter((a) => a.status === 'completed').length },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Master Admissions & Desk Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Approve, reject, or re-assign appointment bookings for walk-in and online patients.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/receptionist/schedule')}
        >
          Book Walk-In Patient
        </Button>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        <div className="w-full sm:w-72">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Filter queue..." />
        </div>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Apt ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Physician</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date & Slot</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((apt) => (
            <TableRow key={apt.id}>
              <TableCell className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{apt.id}</TableCell>
              <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{apt.patientName}</TableCell>
              <TableCell className="text-xs">{apt.doctorName}</TableCell>
              <TableCell className="text-xs font-semibold">{apt.department}</TableCell>
              <TableCell className="text-xs">{formatDate(apt.date)} ({apt.timeSlot})</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(apt.status)} dot>{apt.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {apt.status === 'pending' && (
                  <div className="flex items-center justify-end gap-1.5">
                    <Button variant="success" size="sm" className="px-2 py-1 text-xs" leftIcon={<Check className="w-3.5 h-3.5" />} onClick={() => approveAppointment(apt.id)}>Approve</Button>
                    <Button variant="outline" size="sm" className="px-2 py-1 text-xs text-red-600 border-red-200" leftIcon={<X className="w-3.5 h-3.5" />} onClick={() => rejectAppointment(apt.id)}>Reject</Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
