import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export const ManagePatients: React.FC = () => {
  const patients = [
    { id: 'PAT-10942', name: 'Alexander Wright', age: 34, blood: 'A+', phone: '+1 (555) 876-5432', status: 'Active' },
    { id: 'PAT-10943', name: 'Sophia Martinez', age: 28, blood: 'O+', phone: '+1 (555) 432-1098', status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Manage Patient Registrations
        </h1>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Blood</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs font-bold text-blue-600">{p.id}</TableCell>
                <TableCell className="font-bold text-sm">{p.name}</TableCell>
                <TableCell className="text-xs">{p.age}</TableCell>
                <TableCell><Badge variant="danger">{p.blood}</Badge></TableCell>
                <TableCell><Badge variant="success">{p.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
