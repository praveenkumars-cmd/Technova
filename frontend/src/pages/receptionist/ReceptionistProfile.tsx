import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Building, Mail, Phone } from 'lucide-react';

export const ReceptionistProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Admissions Receptionist Profile
        </h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500" />
          <div>
            <h2 className="text-xl font-extrabold">{user?.name}</h2>
            <Badge variant="warning">{user?.department}</Badge>
            <p className="text-xs text-slate-500 mt-1">Hospital ID: {user?.hospitalId || 'REC-3001'}</p>
          </div>
        </div>

        <div className="pt-6 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-amber-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-amber-500" />
            <span>{user?.phone || '+1 (555) 345-6789'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Building className="w-4 h-4 text-amber-500" />
            <span>Admissions Pavilion - Main Desk Desk</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
