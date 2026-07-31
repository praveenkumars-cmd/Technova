import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { FileText, Download, Printer, Stethoscope, Pill } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { Prescription } from '../../types';

export const PrescriptionsList: React.FC = () => {
  const { prescriptions } = useData();
  const { showToast } = useNotifications();
  const [selectedPx, setSelectedPx] = useState<Prescription | null>(null);

  const handleDownloadPdf = (id: string) => {
    showToast('Download Complete', `Digital prescription PDF ${id}.pdf downloaded.`, 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Active Digital e-Prescriptions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review physician medication instructions and download printable pharmacy orders.
        </p>
      </div>

      <div className="space-y-4">
        {prescriptions.map((px) => (
          <Card key={px.id} className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{px.id}</h3>
                    <Badge variant="primary">Issued {px.date}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Prescribed by {px.doctorName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedPx(px)}>
                  View Full Prescription
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                  onClick={() => handleDownloadPdf(px.id)}
                >
                  Download PDF
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Medications Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {px.medications.map((med) => (
                  <div key={med.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                      <span>{med.name} ({med.dosage})</span>
                      <span className="text-blue-600 dark:text-blue-400">{med.duration}</span>
                    </div>
                    <p className="text-slate-500 mt-1">Frequency: {med.frequency}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Prescription Detail Modal */}
      <Modal
        isOpen={!!selectedPx}
        onClose={() => setSelectedPx(null)}
        title={selectedPx ? `Digital Prescription (${selectedPx.id})` : ''}
      >
        {selectedPx && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <p><strong>Doctor:</strong> {selectedPx.doctorName}</p>
              <p><strong>Diagnosis:</strong> {selectedPx.diagnosis}</p>
            </div>

            <div>
              <h4 className="font-bold mb-2">Instructions</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                {selectedPx.instructions}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedPx(null)}>Close</Button>
              <Button variant="primary" size="sm" leftIcon={<Printer className="w-4 h-4" />} onClick={() => handleDownloadPdf(selectedPx.id)}>Print Prescription</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
