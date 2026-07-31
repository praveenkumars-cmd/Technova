import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { mockDoctors } from '../../data/mockData';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const ManageDoctors: React.FC = () => {
  const { showToast } = useNotifications();
  const [search, setSearch] = useState('');
  const [doctorsList, setDoctorsList] = useState(mockDoctors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newDocName, setNewDocName] = useState('');
  const [newDocDept, setNewDocDept] = useState('Cardiology');

  const filtered = doctorsList.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.department.toLowerCase().includes(search.toLowerCase()));

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      title: 'Consultant Specialist',
      department: newDocDept,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      rating: 4.9,
      reviews: 1,
      experience: '8+ Yrs Exp.',
      availableDays: ['Mon', 'Wed', 'Fri'],
      timeSlots: ['09:00 AM'],
      fee: '$180',
    };
    setDoctorsList((prev) => [newDoc, ...prev]);
    setIsAddModalOpen(false);
    showToast('Doctor Created', `Added ${newDocName} to hospital staff database.`, 'success');
  };

  const handleDelete = (id: string) => {
    setDoctorsList((prev) => prev.filter((d) => d.id !== id));
    showToast('Doctor Disabled', 'Doctor account status disabled.', 'warning');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Manage Doctor Accounts & Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Add new attending physicians, assign hospital departments, and set fees.
          </p>
        </div>

        <Button variant="glow" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
          Add New Doctor
        </Button>
      </div>

      <Card className="p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search doctor by name or specialty..." />
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img src={doc.avatar} alt={doc.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{doc.name}</span>
                </div>
              </TableCell>
              <TableCell><Badge variant="primary">{doc.department}</Badge></TableCell>
              <TableCell className="text-xs">{doc.title}</TableCell>
              <TableCell className="text-xs">{doc.experience}</TableCell>
              <TableCell className="text-xs font-bold text-amber-500">★ {doc.rating}</TableCell>
              <TableCell className="text-right">
                <button onClick={() => handleDelete(doc.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Doctor">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <Input label="Doctor Full Name" value={newDocName} onChange={(e) => setNewDocName(e.target.value)} placeholder="e.g. Dr. Jonathan Vance" required />
          <Select label="Department" value={newDocDept} onChange={(e) => setNewDocDept(e.target.value)} options={[{ label: 'Cardiology', value: 'Cardiology' }, { label: 'Neurology', value: 'Neurology' }, { label: 'Orthopedics', value: 'Orthopedics' }]} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="glow" size="sm" type="submit">Save Doctor</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
