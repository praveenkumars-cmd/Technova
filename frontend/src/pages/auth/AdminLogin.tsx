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
import {
  HeartPulse,
  Shield,
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

export const AdminLogin: React.FC = () => {
  const { switchRole } = useAuth();
  const { effectiveTheme, toggleTheme } = useTheme();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'marcus.vance@pulsecare.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    switchRole('admin');
    showToast('Executive Admin Access', `Welcome back, Marcus Vance!`, 'success');
    navigate('/admin/dashboard');
  };

  const handleQuickDemo = () => {
    setValue('email', 'marcus.vance@pulsecare.com');
    setValue('password', 'password123');
    onSubmit({ email: 'marcus.vance@pulsecare.com', password: 'password123' });
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
          <div className="p-2.5 rounded-2xl bg-purple-600 text-white shadow-soft-sm">
            <HeartPulse className="w-7 h-7" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-slate-100">
            Pulse<span className="text-purple-600 dark:text-purple-400">Care</span>
          </span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
          <Shield className="w-4 h-4" />
          <span>Executive System Administration</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          System Admin Sign In
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Hospital executive metrics, role permissions, audit trails, and backup tools.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <div className="mb-6 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                Hackathon Demo Mode
              </span>
            </div>
            <button
              onClick={handleQuickDemo}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 underline hover:text-purple-800"
            >
              1-Click Demo Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Admin Account Email"
              type="email"
              placeholder="marcus.vance@pulsecare.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Master Password"
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
              <Checkbox label="Remember admin session" {...register('rememberMe')} />
              <span className="font-semibold text-purple-600 dark:text-purple-400 cursor-pointer">Help</span>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              leftIcon={<Lock className="w-4 h-4" />}
            >
              Authenticate Executive Dashboard
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            <span>Switch Portal: </span>
            <Link to="/auth/doctor-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-1">Doctor</Link>
            <span className="mx-1">•</span>
            <Link to="/auth/patient-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Patient</Link>
            <span className="mx-1">•</span>
            <Link to="/auth/receptionist-login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Receptionist</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
