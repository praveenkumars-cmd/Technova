import React from 'react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { Sun, Moon, Bell } from 'lucide-react';

export const ReceptionistSettings: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Admissions Desk Settings
        </h1>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <CardTitle className="mb-3">Theme Selection</CardTitle>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="text-sm font-bold">Active Theme: {effectiveTheme.toUpperCase()}</span>
            <Button variant="outline" size="sm" onClick={toggleTheme}>Toggle Theme</Button>
          </div>
        </div>

        <div>
          <CardTitle className="mb-3">Admissions Queue Alerts</CardTitle>
          <div className="space-y-3">
            <Checkbox label="Sound alert when new walk-in or online appointment arrives" defaultChecked />
            <Checkbox label="Auto-refresh master queue every 30 seconds" defaultChecked />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button variant="secondary" size="md" onClick={() => showToast('Settings Saved', 'Admissions desk settings updated.', 'success')}>Save Settings</Button>
        </div>
      </Card>
    </div>
  );
};
