import React from 'react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { Sun, Moon } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Executive Admin System Settings
        </h1>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <CardTitle className="mb-3">Portal Theme</CardTitle>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="text-sm font-bold">Active Theme: {effectiveTheme.toUpperCase()}</span>
            <Button variant="outline" size="sm" onClick={toggleTheme}>Toggle Theme</Button>
          </div>
        </div>

        <div>
          <CardTitle className="mb-3">Global Security Policies</CardTitle>
          <div className="space-y-3">
            <Checkbox label="Enforce 2FA for all Doctor and Admin logins" defaultChecked />
            <Checkbox label="Automatic session logout after 15 minutes of inactivity" defaultChecked />
            <Checkbox label="Log every patient record view in audit trail" defaultChecked />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button variant="glow" size="md" onClick={() => showToast('Global Settings Saved', 'Hospital platform security policies updated.', 'success')}>Save Policy Settings</Button>
        </div>
      </Card>
    </div>
  );
};
