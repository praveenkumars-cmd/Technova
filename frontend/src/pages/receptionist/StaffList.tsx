import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export const StaffList: React.FC = () => {
  const staff = [
    { id: 'STF-301', name: 'Elena Rostova', role: 'Lead Admissions Receptionist', dept: 'Main Desk', status: 'Active' },
    { id: 'STF-302', name: 'James Patterson', role: 'Billing Specialist', dept: 'Finance & Insurance', status: 'Active' },
    { id: 'STF-303', name: 'Maria Garcia', role: 'Medical Records Technician', dept: 'Health IT', status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Administrative & Ops Staff Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Admissions, billing, medical records, and facilities support team.
        </p>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{s.id}</TableCell>
                <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{s.name}</TableCell>
                <TableCell className="text-xs font-semibold">{s.role}</TableCell>
                <TableCell className="text-xs">{s.dept}</TableCell>
                <TableCell><Badge variant="success">{s.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
