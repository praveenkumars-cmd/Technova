import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Modal } from '../../components/ui/Modal';
import { SearchInput } from '../../components/common/SearchInput';
import {
  FileText,
  Activity,
  Heart,
  AlertCircle,
  Download,
  Eye,
  Phone,
  Shield,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const PatientHealthRecords: React.FC = () => {
  const { healthRecord } = useData();
  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScanImage, setSelectedScanImage] = useState<string | null>(null);

  const handleDownloadReport = (title: string) => {
    showToast('Download Started', `Downloading PDF file: ${title}.pdf`, 'success');
  };

  const tabs = [
    { id: 'summary', label: 'Clinical Summary & Vitals' },
    { id: 'labs', label: 'Lab Results', count: healthRecord.labReports.length },
    { id: 'scans', label: 'Diagnostic Scans', count: healthRecord.scanReports.length },
    { id: 'history', label: 'Past Conditions & Surgery' },
    { id: 'vaccines', label: 'Immunization Record' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Patient EHR & Health Records Search
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access complete patient history, lab reports, imaging scans, and emergency profiles.
          </p>
        </div>
      </div>

      {/* Patient Profile Top Banner */}
      <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white dark:from-slate-900 dark:to-slate-950 border-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
              alt="Alexander Wright"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-soft-sm"
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-extrabold">Alexander Wright</h2>
                <Badge variant="primary">ID: {healthRecord.patientId}</Badge>
                <Badge variant="danger">Blood Group: {healthRecord.bloodGroup}</Badge>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {healthRecord.age} Yrs • {healthRecord.gender} • Height: {healthRecord.height} • Weight: {healthRecord.weight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6">
            <div className="flex flex-col text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Emergency Contact</span>
              <span className="font-bold text-white mt-0.5">{healthRecord.emergencyContact.name} ({healthRecord.emergencyContact.relationship})</span>
              <span className="text-blue-400 font-mono mt-0.5">{healthRecord.emergencyContact.phone}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Control */}
      <Card className="p-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
      </Card>

      {/* Tab 1: Clinical Summary & Vitals */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Known Allergies Card */}
          <Card className="p-6 border-red-200/80 dark:border-red-900/40">
            <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Severe Allergies & Contraindications
              </CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-2">
              {healthRecord.allergies.map((allergy) => (
                <Badge key={allergy} variant="danger">
                  {allergy}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Chronic Conditions */}
          <Card className="p-6 border-amber-200/80 dark:border-amber-900/40">
            <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
              <CardTitle className="text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Active Medical Conditions
              </CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-2">
              {healthRecord.existingConditions.map((cond) => (
                <Badge key={cond} variant="warning">
                  {cond}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Lab Results */}
      {activeTab === 'labs' && (
        <Card className="p-6">
          <CardTitle className="mb-4">Laboratory Diagnostic Reports</CardTitle>
          <div className="space-y-3">
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
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lab.category} • Date: {lab.date} • Size: {lab.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={lab.status === 'Normal' ? 'success' : 'danger'}>{lab.status}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={() => handleDownloadReport(lab.title)}
                  >
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Diagnostic Scans */}
      {activeTab === 'scans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthRecord.scanReports.map((scan) => (
            <Card key={scan.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="info">{scan.modality}</Badge>
                  <span className="text-xs text-slate-400">{scan.date}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">{scan.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4 leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Findings: </strong>
                  {scan.findings}
                </p>

                {scan.imageUrl && (
                  <div
                    onClick={() => setSelectedScanImage(scan.imageUrl || null)}
                    className="relative h-44 rounded-xl overflow-hidden cursor-pointer group border border-slate-200 dark:border-slate-800"
                  >
                    <img src={scan.imageUrl} alt={scan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-semibold text-xs gap-1.5">
                      <Eye className="w-4 h-4" /> Expand Scan Image
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => handleDownloadReport(scan.title)}
              >
                Download DICOM Record
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 4: Past Conditions & Surgery */}
      {activeTab === 'history' && (
        <Card className="p-6">
          <CardTitle className="mb-4">Past Medical & Surgical Procedures</CardTitle>
          <div className="space-y-3">
            {healthRecord.medicalHistory.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-start gap-4">
                <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs">
                  {item.year}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.condition}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{item.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 5: Immunization Record */}
      {activeTab === 'vaccines' && (
        <Card className="p-6">
          <CardTitle className="mb-4">Vaccination & Immunization Ledger</CardTitle>
          <div className="space-y-3">
            {healthRecord.vaccinations.map((vac, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{vac.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Administered / Due: {vac.date}</p>
                  </div>
                </div>
                <Badge variant={vac.status === 'Completed' ? 'success' : 'warning'}>{vac.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Scan Image Modal */}
      <Modal
        isOpen={!!selectedScanImage}
        onClose={() => setSelectedScanImage(null)}
        title="Diagnostic Radiology Image Preview"
        maxWidth="2xl"
      >
        {selectedScanImage && (
          <img src={selectedScanImage} alt="Scan preview" className="w-full h-auto rounded-2xl object-cover" />
        )}
      </Modal>
    </div>
  );
};
