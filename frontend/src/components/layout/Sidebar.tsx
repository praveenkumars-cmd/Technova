import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { cn } from '../../utils/cn';
import {
  LayoutDashboard,
  CalendarCheck,
  FileSpreadsheet,
  FilePlus,
  Clock,
  AlertOctagon,
  User,
  Settings,
  Users,
  CreditCard,
  ShieldCheck,
  Building2,
  ListTodo,
  Database,
  Activity,
  HeartPulse,
  LogOut,
  ChevronLeft,
  X,
} from 'lucide-react';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  toggleCollapse,
}) => {
  const { user, logout } = useAuth();
  const role: UserRole = user?.role || 'doctor';

  const roleNavItems: Record<UserRole, NavItem[]> = {
    doctor: [
      { title: 'Overview', path: '/doctor/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { title: 'Appointments', path: '/doctor/appointments', icon: <CalendarCheck className="w-5 h-5" /> },
      { title: 'Health Records', path: '/doctor/health-records', icon: <FileSpreadsheet className="w-5 h-5" /> },
      { title: 'Create Prescription', path: '/doctor/prescriptions/new', icon: <FilePlus className="w-5 h-5" /> },
      { title: 'Shift Allocation', path: '/doctor/schedule', icon: <Clock className="w-5 h-5" /> },
      { title: 'Emergency Cases', path: '/doctor/emergencies', icon: <AlertOctagon className="w-5 h-5" />, badge: 'STAT' },
      { title: 'Doctor Profile', path: '/doctor/profile', icon: <User className="w-5 h-5" /> },
      { title: 'Settings', path: '/doctor/settings', icon: <Settings className="w-5 h-5" /> },
    ],
    patient: [
      { title: 'My Portal Overview', path: '/patient/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { title: 'Book Appointment', path: '/patient/book-appointment', icon: <CalendarCheck className="w-5 h-5" />, badge: 'New' },
      { title: 'Appointment History', path: '/patient/appointments', icon: <Clock className="w-5 h-5" /> },
      { title: 'Health Records', path: '/patient/records', icon: <FileSpreadsheet className="w-5 h-5" /> },
      { title: 'Prescriptions', path: '/patient/prescriptions', icon: <FilePlus className="w-5 h-5" /> },
      { title: 'Medical Timeline', path: '/patient/timeline', icon: <Activity className="w-5 h-5" /> },
      { title: 'Billing & Copay', path: '/patient/payment', icon: <CreditCard className="w-5 h-5" /> },
      { title: 'My Profile', path: '/patient/profile', icon: <User className="w-5 h-5" /> },
      { title: 'Settings', path: '/patient/settings', icon: <Settings className="w-5 h-5" /> },
    ],
    receptionist: [
      { title: 'Reception Desk', path: '/receptionist/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { title: 'Manage Appointments', path: '/receptionist/appointments', icon: <CalendarCheck className="w-5 h-5" /> },
      { title: 'Schedule Walk-In', path: '/receptionist/schedule', icon: <FilePlus className="w-5 h-5" /> },
      { title: 'Shift Scheduling', path: '/receptionist/shifts', icon: <ListTodo className="w-5 h-5" /> },
      { title: 'Patient Directory', path: '/receptionist/patients', icon: <Users className="w-5 h-5" /> },
      { title: 'Medical Staff Roster', path: '/receptionist/staff', icon: <Building2 className="w-5 h-5" /> },
      { title: 'Desk Profile', path: '/receptionist/profile', icon: <User className="w-5 h-5" /> },
      { title: 'Settings', path: '/receptionist/settings', icon: <Settings className="w-5 h-5" /> },
    ],
    admin: [
      { title: 'Executive Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { title: 'Manage Doctors', path: '/admin/doctors', icon: <Users className="w-5 h-5" /> },
      { title: 'Manage Patients', path: '/admin/patients', icon: <Users className="w-5 h-5" /> },
      { title: 'Manage Staff', path: '/admin/staff', icon: <Users className="w-5 h-5" /> },
      { title: 'Departments', path: '/admin/departments', icon: <Building2 className="w-5 h-5" /> },
      { title: 'Roles & Permissions', path: '/admin/permissions', icon: <ShieldCheck className="w-5 h-5" /> },
      { title: 'Audit Logs & Status', path: '/admin/audit-logs', icon: <Activity className="w-5 h-5" /> },
      { title: 'System Backup UI', path: '/admin/backup', icon: <Database className="w-5 h-5" /> },
      { title: 'Admin Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    ],
  };

  const navItems = roleNavItems[role] || roleNavItems.doctor;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 ease-in-out select-none',
          isCollapsed ? 'w-20' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800/80">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-blue-600 text-white dark:bg-blue-500 shadow-soft-sm shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
                  Pulse<span className="text-blue-600 dark:text-blue-400">Care</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  {role} portal
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', isCollapsed && 'rotate-180')} />
          </button>

          {/* Mobile Close Toggle */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all group relative',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                )
              }
            >
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="truncate">{item.title}</span>}
              {!isCollapsed && item.badge && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-700 dark:bg-blue-900/80 dark:text-blue-300">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
          {!isCollapsed && (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 mb-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {user?.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors',
              isCollapsed && 'justify-center'
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout Session</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
