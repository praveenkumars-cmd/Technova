import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { UserCheck, Mail, Phone, Heart, Shield, AlertTriangle } from 'lucide-react';

export const PatientProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Patient Personal Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          View registered contact information, insurance claims policy, and emergency contacts.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-600 dark:border-emerald-500 shadow-soft-md"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
              <h2 className="text-xl font-extrabold">{user?.name}</h2>
              <Badge variant="success">Hospital ID: {user?.hospitalId || 'PAT-10942'}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Primary Physician: Dr. Sarah Jenkins (Cardiology Center)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs sm:text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>{user?.phone || '+1 (555) 876-5432'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Insurance Provider: Aetna Choice POS II (Pol #99104)</span>
            </div>
          </div>

          <div className="space-y-4 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
            <h4 className="font-bold text-red-900 dark:text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" /> Emergency Triage Contact
            </h4>
            <p className="text-xs text-red-800 dark:text-red-300">
              <strong>Name:</strong> Eleanor Wright (Spouse)<br />
              <strong>Direct Phone:</strong> +1 (555) 912-3456
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
