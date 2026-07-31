import React from 'react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { Sun, Moon, Bell, Shield } from 'lucide-react';

export const PatientSettings: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();

  const handleSave = () => {
    showToast('Patient Settings Saved', 'Your notifications & theme preferences have been updated.', 'success');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Patient Portal Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage appointment reminders, e-prescription alerts, and display options.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <CardTitle className="mb-3 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            Portal Theme Mode
          </CardTitle>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="font-bold text-sm">Theme Selection</h4>
              <p className="text-xs text-slate-500">Currently using {effectiveTheme.toUpperCase()} mode</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              Switch to {effectiveTheme === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </div>

        <div>
          <CardTitle className="mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-500" />
            Appointment & Prescription Alerts
          </CardTitle>
          <div className="space-y-3">
            <Checkbox label="Send SMS text reminders 24 hours prior to appointment" defaultChecked />
            <Checkbox label="Email notification when new lab reports are ready" defaultChecked />
            <Checkbox label="Push notification when doctor issues a digital prescription" defaultChecked />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button variant="success" size="md" onClick={handleSave}>
            Save Patient Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};
