import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Download, FileText, Activity, AlertCircle, Eye } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { Modal } from '../../components/ui/Modal';

export const HealthRecordsView: React.FC = () => {
  const { healthRecord } = useData();
  const { showToast } = useNotifications();
  const [activeTab, setActiveTab] = useState('labs');
  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  const tabs = [
    { id: 'labs', label: 'Lab Reports', count: healthRecord.labReports.length },
    { id: 'scans', label: 'Radiology Scans', count: healthRecord.scanReports.length },
    { id: 'vitals', label: 'My Vitals & Allergies' },
  ];

  const handleDownload = (name: string) => {
    showToast('Download Initiated', `Downloading PDF: ${name}`, 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Personal Medical Records & Diagnostics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Download digital lab test results, imaging scans, and review vital metrics.
        </p>
      </div>

      <Card className="p-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
      </Card>

      {activeTab === 'labs' && (
        <Card className="p-6 space-y-4">
          {healthRecord.labReports.map((lab) => (
            <div
              key={lab.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{lab.title}</h4>
                  <p className="text-xs text-slate-500">{lab.category} • Date: {lab.date} • {lab.fileSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={lab.status === 'Normal' ? 'success' : 'danger'}>{lab.status}</Badge>
                <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={() => handleDownload(lab.title)}>
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {activeTab === 'scans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthRecord.scanReports.map((scan) => (
            <Card key={scan.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="info">{scan.modality}</Badge>
                  <span className="text-xs text-slate-400">{scan.date}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">{scan.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4 leading-relaxed">
                  {scan.findings}
                </p>
                {scan.imageUrl && (
                  <img
                    src={scan.imageUrl}
                    alt={scan.title}
                    onClick={() => setSelectedScan(scan.imageUrl || null)}
                    className="w-full h-40 object-cover rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-90 transition-opacity"
                  />
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" leftIcon={<Download className="w-4 h-4" />} onClick={() => handleDownload(scan.title)}>
                Download Scan File
              </Button>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'vitals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold text-base mb-4">Patient Profile & Vitals</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Blood Group:</span>
                <Badge variant="danger">{healthRecord.bloodGroup}</Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Age / Gender:</span>
                <span className="font-bold">{healthRecord.age} Yrs / {healthRecord.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Height & Weight:</span>
                <span className="font-bold">{healthRecord.height} • {healthRecord.weight}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-base mb-4 text-red-600 dark:text-red-400">Allergies & Medical Alerts</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {healthRecord.allergies.map((a) => (
                <Badge key={a} variant="danger">{a}</Badge>
              ))}
            </div>
            <h3 className="font-bold text-base mb-4 text-amber-600 dark:text-amber-400">Existing Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {healthRecord.existingConditions.map((c) => (
                <Badge key={c} variant="warning">{c}</Badge>
              ))}
            </div>
          </Card>
        </div>
      )}

      <Modal isOpen={!!selectedScan} onClose={() => setSelectedScan(null)} title="Radiology Image Viewer" maxWidth="2xl">
        {selectedScan && <img src={selectedScan} alt="Scan preview" className="w-full h-auto rounded-2xl" />}
      </Modal>
    </div>
  );
};
