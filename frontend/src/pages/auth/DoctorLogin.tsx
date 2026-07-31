import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Modal } from '../../components/ui/Modal';
import {
  HeartPulse,
  Stethoscope,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Lock,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const DoctorLogin: React.FC = () => {
  const { switchRole } = useAuth();
  const { effectiveTheme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'sarah.jenkins@pulsecare.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    switchRole('doctor');
    showToast('Doctor Authenticated', `Welcome back, Dr. Sarah Jenkins!`, 'success');
    navigate('/doctor/dashboard');
  };

  const handleQuickDemo = () => {
    setValue('email', 'sarah.jenkins@pulsecare.com');
    setValue('password', 'password123');
    onSubmit({ email: 'sarah.jenkins@pulsecare.com', password: 'password123' });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotModalOpen(false);
    showToast('Reset Instructions Sent', `Check inbox for ${resetEmail || 'your email'}`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      {/* Top Header Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {effectiveTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
        <Link to="/">
          <Button variant="ghost" size="sm">Back to Home</Button>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-blue-600 text-white dark:bg-blue-500 shadow-soft-sm">
            <HeartPulse className="w-7 h-7" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-slate-100">
            Pulse<span className="text-blue-600 dark:text-blue-400">Care</span>
          </span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
          <Stethoscope className="w-4 h-4" />
          <span>Attending Physician Portal</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Doctor & Clinician Sign In
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Access today's appointments, health records, and prescription tools.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200/80 dark:border-slate-800">
          {/* Quick Demo Login Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                Hackathon Demo Mode Active
              </span>
            </div>
            <button
              onClick={handleQuickDemo}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
            >
              1-Click Demo Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Doctor Hospital Email"
              type="email"
              placeholder="sarah.jenkins@pulsecare.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                error={errors.password?.message}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                {...register('password')}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <Checkbox label="Remember this device" {...register('rememberMe')} />
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              leftIcon={<Lock className="w-4 h-4" />}
            >
              Authenticate Doctor Access
            </Button>
          </form>

          {/* Switch Role Links */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            <span>Not a doctor? Switch portal: </span>
            <Link to="/auth/patient-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-1">
              Patient
            </Link>
            <span className="mx-1">•</span>
            <Link to="/auth/receptionist-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Receptionist
            </Link>
            <span className="mx-1">•</span>
            <Link to="/auth/admin-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Doctor Credentials"
        description="Enter your registered hospital email to receive reset instructions."
      >
        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            label="Registered Email Address"
            type="email"
            required
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="sarah.jenkins@pulsecare.com"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsForgotModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
