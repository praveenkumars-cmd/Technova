import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { SearchInput } from '../../components/common/SearchInput';
import { CalendarCheck, PlusCircle, X } from 'lucide-react';
import { formatDate, getStatusBadgeVariant } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const AppointmentHistory: React.FC = () => {
  const { appointments, cancelAppointment } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const patientApts = appointments.filter(
    (a) =>
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            My Appointment History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            View all upcoming, past, and pending consultation records.
          </p>
        </div>

        <Button
          variant="glow"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => navigate('/patient/book-appointment')}
        >
          Book New Consultation
        </Button>
      </div>

      <Card className="p-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search by doctor or department..." />
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Attending Doctor</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patientApts.map((apt) => (
            <TableRow key={apt.id}>
              <TableCell className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                {apt.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={apt.doctorAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'}
                    alt={apt.doctorName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{apt.doctorName}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs font-medium">{apt.department}</TableCell>
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
                {(apt.status === 'pending' || apt.status === 'approved') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 py-1 text-xs text-red-600 border-red-200 dark:border-red-900/60"
                    leftIcon={<X className="w-3.5 h-3.5" />}
                    onClick={() => cancelAppointment(apt.id)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
