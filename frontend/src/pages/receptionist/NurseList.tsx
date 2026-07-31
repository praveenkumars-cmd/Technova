import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export const NurseList: React.FC = () => {
  const nurses = [
    { id: 'NRS-101', name: 'Nurse Clara Oswald', dept: 'Emergency Medicine', shift: 'Morning (07:00-15:00)', status: 'On Duty' },
    { id: 'NRS-102', name: 'Nurse David Miller', dept: 'Pediatrics', shift: 'Evening (15:00-23:00)', status: 'Scheduled' },
    { id: 'NRS-103', name: 'Nurse Sarah Connor', dept: 'Cardiology ICU', shift: 'Night (23:00-07:00)', status: 'On Duty' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Nursing & Critical Care Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Registered nurses assigned to hospital wings and ICU units.
        </p>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nurse ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Current Shift</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nurses.map((n) => (
              <TableRow key={n.id}>
                <TableCell className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{n.id}</TableCell>
                <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{n.name}</TableCell>
                <TableCell className="text-xs">{n.dept}</TableCell>
                <TableCell className="text-xs">{n.shift}</TableCell>
                <TableCell><Badge variant={n.status === 'On Duty' ? 'success' : 'warning'}>{n.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
