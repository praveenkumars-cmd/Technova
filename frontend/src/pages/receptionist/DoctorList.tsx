import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockDoctors } from '../../data/mockData';
import { Stethoscope, Star } from 'lucide-react';

export const DoctorList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Attending Medical Roster & Doctors
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          View doctor specialties, room numbers, and available consultation hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDoctors.map((doc) => (
          <Card key={doc.id} className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{doc.name}</h4>
                <Badge variant="primary">{doc.department}</Badge>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">{doc.title} • {doc.experience}</p>
            <div className="text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <span>Fee: <strong>{doc.fee}</strong></span>
              <span className="text-amber-500 font-bold flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400" /> {doc.rating}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
