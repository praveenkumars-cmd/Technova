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
  UserCheck,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Sparkles,
  Lock,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const PatientLogin: React.FC = () => {
  const { switchRole } = useAuth();
  const { effectiveTheme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alexander.wright@gmail.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    switchRole('patient');
    showToast('Patient Portal Access', `Welcome back, Alexander Wright!`, 'success');
    navigate('/patient/dashboard');
  };

  const handleQuickDemo = () => {
    setValue('email', 'alexander.wright@gmail.com');
    setValue('password', 'password123');
    onSubmit({ email: 'alexander.wright@gmail.com', password: 'password123' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
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
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-soft-sm">
            <HeartPulse className="w-7 h-7" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-slate-100">
            Pulse<span className="text-emerald-600 dark:text-emerald-400">Care</span>
          </span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
          <UserCheck className="w-4 h-4" />
          <span>Patient Personal Health Portal</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Patient Portal Sign In
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Book appointments, view medical history, and download prescriptions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                Hackathon Demo Mode
              </span>
            </div>
            <button
              onClick={handleQuickDemo}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-800"
            >
              1-Click Demo Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Patient Email"
              type="email"
              placeholder="alexander.wright@gmail.com"
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
              <Checkbox label="Remember me" {...register('rememberMe')} />
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="success"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              leftIcon={<Lock className="w-4 h-4" />}
            >
              Patient Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            <span>Switch Portal: </span>
            <Link to="/auth/doctor-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-1">Doctor</Link>
            <span className="mx-1">•</span>
            <Link to="/auth/receptionist-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Receptionist</Link>
            <span className="mx-1">•</span>
            <Link to="/auth/admin-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Admin</Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Patient Account Password"
        description="Enter your registered email address to receive password recovery steps."
      >
        <div className="space-y-4">
          <Input label="Registered Patient Email" type="email" placeholder="alexander.wright@gmail.com" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsForgotModalOpen(false)}>Cancel</Button>
            <Button variant="success" size="sm" onClick={() => {
              setIsForgotModalOpen(false);
              showToast('Password Reset Sent', 'Check your email inbox for recovery link', 'success');
            }}>Send Recovery Link</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
