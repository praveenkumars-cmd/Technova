import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/common/SearchInput';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Download, User } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const PatientList: React.FC = () => {
  const { showToast } = useNotifications();
  const [search, setSearch] = useState('');

  const patients = [
    { id: 'PAT-10942', name: 'Alexander Wright', age: 34, blood: 'A+', phone: '+1 (555) 876-5432', email: 'alexander.wright@gmail.com' },
    { id: 'PAT-10943', name: 'Sophia Martinez', age: 28, blood: 'O+', phone: '+1 (555) 432-1098', email: 'sophia.m@gmail.com' },
    { id: 'PAT-10944', name: 'David Kim', age: 45, blood: 'B+', phone: '+1 (555) 654-3210', email: 'david.kim@gmail.com' },
    { id: 'PAT-10945', name: 'Olivia Taylor', age: 52, blood: 'AB+', phone: '+1 (555) 789-0123', email: 'olivia.t@gmail.com' },
    { id: 'PAT-10946', name: 'Ethan Harrison', age: 8, blood: 'A-', phone: '+1 (555) 987-6543', email: 'parents.harrison@gmail.com' },
  ];

  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  const handleExport = () => {
    showToast('Export Complete', 'Exported patient directory to patients_master_list.csv', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Hospital Patient Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master record list of all admitted and registered hospital patients.
          </p>
        </div>

        <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      <Card className="p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search patients by name or ID..." />
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{p.id}</TableCell>
              <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.name}</TableCell>
              <TableCell className="text-xs">{p.age} Yrs</TableCell>
              <TableCell><Badge variant="danger">{p.blood}</Badge></TableCell>
              <TableCell className="text-xs">{p.phone}</TableCell>
              <TableCell className="text-xs text-slate-500">{p.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
