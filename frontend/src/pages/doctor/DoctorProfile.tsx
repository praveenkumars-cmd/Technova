import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Stethoscope, Award, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';

export const DoctorProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Physician Clinical Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Your public hospital directory profile, credentials, and office location.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-blue-600 dark:border-blue-500 shadow-soft-md"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
              <h2 className="text-xl font-extrabold">{user?.name}</h2>
              <Badge variant="primary">{user?.department}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {user?.specialization || 'Interventional Cardiology Specialist'}
            </p>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start text-xs font-semibold text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.95 Rating (142 Verified Consultations)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs sm:text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{user?.phone || '+1 (555) 234-5678'}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{user?.roomNumber || 'Suite 402 - Heart & Vascular Pavilion'}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Board Certified Interventional Cardiologist</span>
            </div>
            <div className="flex items-center gap-3">
              <Stethoscope className="w-4 h-4 text-emerald-500" />
              <span>14+ Years Clinical & Surgical Experience</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>Consultation Hours: Mon, Tue, Thu, Fri (09:00 - 17:00)</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
