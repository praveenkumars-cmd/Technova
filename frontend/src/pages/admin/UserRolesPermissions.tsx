import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { ShieldCheck } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const UserRolesPermissions: React.FC = () => {
  const { showToast } = useNotifications();

  const [permissions, setPermissions] = useState([
    { module: 'View Health Records', doctor: true, patient: true, receptionist: true, admin: true },
    { module: 'Create e-Prescriptions', doctor: true, patient: false, receptionist: false, admin: true },
    { module: 'Approve / Reject Appointments', doctor: true, patient: false, receptionist: true, admin: true },
    { module: 'Schedule Walk-In Patients', doctor: false, patient: false, receptionist: true, admin: true },
    { module: 'Access Revenue Analytics', doctor: false, patient: false, receptionist: false, admin: true },
    { module: 'Execute System Backups', doctor: false, patient: false, receptionist: false, admin: true },
  ]);

  const togglePerm = (idx: number, role: 'doctor' | 'patient' | 'receptionist' | 'admin') => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [role]: !p[role] } : p))
    );
  };

  const handleSave = () => {
    showToast('Permissions Updated', 'Role permission matrix saved to security policy server.', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            User Roles & Permission Control Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure granular resource access policies for Doctor, Patient, Receptionist, and Admin roles.
          </p>
        </div>

        <Button variant="glow" size="sm" leftIcon={<ShieldCheck className="w-4 h-4" />} onClick={handleSave}>
          Save Access Matrix
        </Button>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>System Function / Module</TableHead>
              <TableHead className="text-center">Doctor</TableHead>
              <TableHead className="text-center">Patient</TableHead>
              <TableHead className="text-center">Receptionist</TableHead>
              <TableHead className="text-center">Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((perm, idx) => (
              <TableRow key={perm.module}>
                <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{perm.module}</TableCell>
                <TableCell className="text-center">
                  <Checkbox checked={perm.doctor} onChange={() => togglePerm(idx, 'doctor')} />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox checked={perm.patient} onChange={() => togglePerm(idx, 'patient')} />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox checked={perm.receptionist} onChange={() => togglePerm(idx, 'receptionist')} />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox checked={perm.admin} onChange={() => togglePerm(idx, 'admin')} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
