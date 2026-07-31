import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Plus, Trash2, FileCheck, Printer, ArrowLeft } from 'lucide-react';
import { MedicationItem } from '../../types';

export const CreatePrescription: React.FC = () => {
  const { user } = useAuth();
  const { addPrescription } = useData();
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState('pat-1');
  const [patientName, setPatientName] = useState('Alexander Wright');
  const [diagnosis, setDiagnosis] = useState('Essential Hypertension & Mild Exertional Tachycardia');
  const [instructions, setInstructions] = useState('Maintain low-sodium diet (<2000mg/day). Monitor blood pressure twice daily.');

  const [medications, setMedications] = useState<MedicationItem[]>([
    {
      id: 'm1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: '1-0-0 (Morning)',
      duration: '30 Days',
      notes: 'Take before breakfast',
    },
    {
      id: 'm2',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: '0-0-1 (Night)',
      duration: '30 Days',
      notes: 'Take after dinner',
    },
  ]);

  const handleAddMedicationRow = () => {
    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      name: '',
      dosage: '',
      frequency: '1-0-1',
      duration: '7 Days',
      notes: '',
    };
    setMedications((prev) => [...prev, newMed]);
  };

  const handleRemoveMedicationRow = (id: string) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateMedication = (id: string, field: keyof MedicationItem, value: string) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPrescription({
      patientId,
      patientName,
      doctorId: user?.id || 'doc-1',
      doctorName: user?.name || 'Dr. Sarah Jenkins',
      diagnosis,
      medications,
      instructions,
    });
    navigate('/doctor/dashboard');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/doctor/dashboard')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Create Digital e-Prescription
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate digital prescription records for patient download & pharmacy fulfillment.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient & Doctor Header Card */}
        <Card className="p-6">
          <CardTitle className="mb-4">Patient & Clinical Details</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Select Patient"
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
                setPatientName(e.target.options[e.target.selectedIndex].text);
              }}
              options={[
                { label: 'Alexander Wright (PAT-10942)', value: 'pat-1' },
                { label: 'Sophia Martinez (PAT-10943)', value: 'pat-2' },
                { label: 'David Kim (PAT-10944)', value: 'pat-3' },
              ]}
            />

            <Input
              label="Attending Doctor"
              value={user?.name || 'Dr. Sarah Jenkins, MD'}
              readOnly
              className="bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="mt-4">
            <Textarea
              label="Clinical Diagnosis & Symptoms"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={2}
              required
            />
          </div>
        </Card>

        {/* Medication Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Prescribed Medications</CardTitle>
              <p className="text-xs text-slate-500">Configure drug dosage, daily frequency, and duration</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleAddMedicationRow}
            >
              Add Medicine
            </Button>
          </div>

          <div className="space-y-4">
            {medications.map((med, index) => (
              <div
                key={med.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 relative grid grid-cols-1 sm:grid-cols-5 gap-3 items-end"
              >
                <div className="sm:col-span-2">
                  <Input
                    label={`Medicine ${index + 1} Name`}
                    placeholder="e.g. Amoxicillin"
                    value={med.name}
                    onChange={(e) => handleUpdateMedication(med.id, 'name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Dosage"
                    placeholder="e.g. 500mg"
                    value={med.dosage}
                    onChange={(e) => handleUpdateMedication(med.id, 'dosage', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Select
                    label="Frequency"
                    value={med.frequency}
                    onChange={(e) => handleUpdateMedication(med.id, 'frequency', e.target.value)}
                    options={[
                      { label: '1-0-0 (Morning)', value: '1-0-0 (Morning)' },
                      { label: '0-0-1 (Night)', value: '0-0-1 (Night)' },
                      { label: '1-0-1 (Morning & Night)', value: '1-0-1 (Morning & Night)' },
                      { label: '1-1-1 (TID)', value: '1-1-1 (TID)' },
                    ]}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      label="Duration"
                      placeholder="7 Days"
                      value={med.duration}
                      onChange={(e) => handleUpdateMedication(med.id, 'duration', e.target.value)}
                    />
                  </div>
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicationRow(med.id)}
                      className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors mb-0.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Instructions Card */}
        <Card className="p-6">
          <Textarea
            label="Special Clinical Instructions & Advice"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
          />
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/doctor/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" variant="glow" leftIcon={<FileCheck className="w-4 h-4" />}>
            Issue Digital Prescription
          </Button>
        </div>
      </form>
    </div>
  );
};
