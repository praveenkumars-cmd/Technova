import React from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Clock, RefreshCw } from 'lucide-react';

export const ShiftScheduling: React.FC = () => {
  const { dutyShifts, toggleShiftStatus } = useData();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Hospital Duty Shift Scheduling Roster
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage shift allocations for Doctors, Nurses, and Admissions desk personnel.
        </p>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Shift Period</TableHead>
              <TableHead>Duty Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dutyShifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{shift.staffName}</TableCell>
                <TableCell className="text-xs font-semibold text-blue-600 dark:text-blue-400">{shift.role}</TableCell>
                <TableCell className="text-xs">{shift.department}</TableCell>
                <TableCell className="text-xs">{shift.shift}</TableCell>
                <TableCell>
                  <Badge variant={shift.status === 'On Duty' ? 'success' : shift.status === 'Scheduled' ? 'warning' : 'neutral'}>
                    {shift.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={() => toggleShiftStatus(shift.id)}>
                    Toggle Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
