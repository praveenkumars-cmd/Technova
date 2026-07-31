import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole } from '../../types';
import { Breadcrumb } from './Breadcrumb';
import { SearchInput } from '../common/SearchInput';
import { Drawer } from '../ui/Drawer';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  CheckCheck,
  User,
  Settings,
  LogOut,
  Sparkles,
  Stethoscope,
  UserCheck,
  Building,
  Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface NavbarProps {
  onOpenMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileSidebar }) => {
  const { user, switchRole, logout } = useAuth();
  const { effectiveTheme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const rolesList: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'doctor', label: 'Doctor Portal', icon: <Stethoscope className="w-4 h-4 text-blue-500" /> },
    { role: 'patient', label: 'Patient Portal', icon: <UserCheck className="w-4 h-4 text-emerald-500" /> },
    { role: 'receptionist', label: 'Receptionist Desk', icon: <Building className="w-4 h-4 text-amber-500" /> },
    { role: 'admin', label: 'Admin Dashboard', icon: <Shield className="w-4 h-4 text-purple-500" /> },
  ];

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    navigate(`/${role}/dashboard`);
  };

  const userMenuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: <User className="w-4 h-4" />,
      onClick: () => navigate(`/${user?.role}/profile`),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => navigate(`/${user?.role}/settings`),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
        {/* Left Section: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <Breadcrumb />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search patients, appointments, doctors..."
          />
        </div>

        {/* Right Section: Role Switcher + Notifs + Theme Toggle + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instant Role Demo Switcher Dropdown */}
          <div className="hidden sm:block">
            <Dropdown
              align="right"
              trigger={
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="capitalize">{user?.role} Mode</span>
                </button>
              }
              items={rolesList.map((r) => ({
                id: r.role,
                label: r.label,
                icon: r.icon,
                onClick: () => handleRoleSwitch(r.role),
              }))}
            />
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {effectiveTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifDrawerOpen(true)}
            className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-600 dark:border-blue-500 shadow-soft-sm"
                />
              </button>
            }
            items={userMenuItems}
          />
        </div>
      </header>

      {/* Notifications Drawer */}
      <Drawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span className="text-base font-bold">Notification Center</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70'
                  : 'bg-white dark:bg-slate-850 border-blue-300 dark:border-blue-800 shadow-soft-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <Badge
                  variant={
                    notif.type === 'approved'
                      ? 'success'
                      : notif.type === 'emergency'
                      ? 'danger'
                      : 'info'
                  }
                >
                  {notif.title}
                </Badge>
                <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                {notif.message}
              </p>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};
