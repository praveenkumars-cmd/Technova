import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Database, Download, CheckCircle2, HardDrive, RefreshCw } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const SystemBackupUI: React.FC = () => {
  const { showToast } = useNotifications();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setProgress(15);
    const timer1 = setTimeout(() => setProgress(55), 800);
    const timer2 = setTimeout(() => setProgress(90), 1600);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setIsBackingUp(false);
      showToast('Backup Completed', 'Full database snapshot saved to encrypted vault S3-AWS-EAST-1.', 'success');
    }, 2400);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          System Database Backup & Recovery Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Trigger automated snapshots, download offline SQL backups, and inspect vault health.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Last Backup: Today at 03:00 AM</h3>
              <p className="text-xs text-slate-500">Size: 4.82 GB • SHA-256 Verified</p>
            </div>
          </div>
          <Badge variant="success">Vault Healthy</Badge>
        </div>

        {isBackingUp && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Creating Database Snapshot...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={() => showToast('Download Started', 'Downloading SQL Dump file...', 'info')}>
            Download Latest SQL Dump
          </Button>
          <Button variant="glow" size="sm" isLoading={isBackingUp} leftIcon={<RefreshCw className="w-4 h-4" />} onClick={handleTriggerBackup}>
            Trigger Instant Backup
          </Button>
        </div>
      </Card>
    </div>
  );
};
