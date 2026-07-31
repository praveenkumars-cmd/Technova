import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockDepartments } from '../../data/mockData';
import { Building2 } from 'lucide-react';

export const ManageDepartments: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Hospital Department Configurations
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDepartments.map((d) => (
          <Card key={d.id} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <Badge variant="primary">{d.doctorCount} Doctors</Badge>
              </div>
              <h3 className="font-bold text-lg mb-1">{d.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{d.description}</p>
            </div>
            <div className="text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Head Doctor: <strong className="text-slate-900 dark:text-slate-100">{d.headDoctor}</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
