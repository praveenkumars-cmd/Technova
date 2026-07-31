import React from 'react';
import { Card } from '../../components/ui/Card';
import { Timeline, TimelineItem } from '../../components/ui/Timeline';
import { Activity, Stethoscope, FileText, CheckCircle } from 'lucide-react';

export const MedicalTimelineView: React.FC = () => {
  const fullTimelineItems: TimelineItem[] = [
    {
      id: 't1',
      date: '2026-07-28',
      title: 'Digital Prescription Issued (RX-7721)',
      description: 'Dr. Sarah Jenkins prescribed Lisinopril 10mg & Atorvastatin 20mg for essential hypertension.',
      category: 'e-Prescription',
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      status: 'Completed',
    },
    {
      id: 't2',
      date: '2026-07-20',
      title: 'Lipid Panel & Chemistry Test',
      description: 'Blood sample drawn at Central Clinical Lab. Cholesterol & Glucose normal.',
      category: 'Laboratory',
      icon: <Activity className="w-4 h-4 text-emerald-500" />,
      status: 'Completed',
    },
    {
      id: 't3',
      date: '2026-07-15',
      title: 'Neurology Outpatient Follow-up',
      description: 'Consultation with Dr. Robert Chen. Evaluated tension headache triggers & posture.',
      category: 'Consultation',
      icon: <Stethoscope className="w-4 h-4 text-purple-500" />,
      status: 'Completed',
    },
    {
      id: 't4',
      date: '2025-11-04',
      title: 'Lumbar Spine MRI Scan',
      description: 'Radiology imaging performed at Pavilion Building B. Mild L5-S1 disc bulge observed.',
      category: 'Radiology MRI',
      icon: <Activity className="w-4 h-4 text-amber-500" />,
      status: 'Completed',
    },
    {
      id: 't5',
      date: '2024-11-12',
      title: 'COVID-19 Booster Vaccination',
      description: 'Pfizer Bivalent booster administered at Community Wellness Pavilion.',
      category: 'Immunization',
      icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
      status: 'Completed',
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Comprehensive Medical Timeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete chronological ledger of consultations, surgeries, lab tests, and immunizations.
        </p>
      </div>

      <Card className="p-6">
        <Timeline items={fullTimelineItems} />
      </Card>
    </div>
  );
};
