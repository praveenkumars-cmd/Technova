import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export const ManageStaff: React.FC = () => {
  const staffMembers = [
    { id: 'STF-001', name: 'Elena Rostova', role: 'Receptionist', dept: 'Admissions Desk', status: 'Active' },
    { id: 'STF-002', name: 'Clara Oswald', role: 'Nurse', dept: 'Emergency Unit', status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Manage Receptionists & Administrative Staff
        </h1>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-xs font-bold text-purple-600">{s.id}</TableCell>
                <TableCell className="font-bold text-sm">{s.name}</TableCell>
                <TableCell className="text-xs">{s.role}</TableCell>
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
