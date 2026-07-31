import React from 'react';
import { HeartPulse, ShieldCheck, Award, PhoneCall, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-soft-sm">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Pulse<span className="text-blue-500">Care</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              PulseCare is an enterprise-grade healthcare management portal empowering patients, clinicians, admission desks, and health system executives with unified digital clinical records and scheduling.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-400" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Portal Portals</h4>
            <Link to="/auth/patient-login" className="hover:text-blue-400 transition-colors">Patient Portal</Link>
            <Link to="/auth/doctor-login" className="hover:text-blue-400 transition-colors">Doctor Portal</Link>
            <Link to="/auth/receptionist-login" className="hover:text-blue-400 transition-colors">Receptionist Desk</Link>
            <Link to="/auth/admin-login" className="hover:text-blue-400 transition-colors">Executive Admin</Link>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Platform Solutions</h4>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">Online Appointments</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">Digital Health Records</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">e-Prescriptions</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">Shift Roster Management</span>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Hospital HQ</h4>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>750 Medical Plaza Way, Suite 400</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <PhoneCall className="w-4 h-4 text-blue-500 shrink-0" />
              <span>+1 (800) 555-PULSE</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span>contact@pulsecare-health.org</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} PulseCare Health Systems Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
