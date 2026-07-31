import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { HeartPulse, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-colors">
      <div className="p-4 rounded-3xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-6 animate-pulse">
        <HeartPulse className="w-16 h-16" />
      </div>

      <h1 className="text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold tracking-tight mt-2">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm mt-2 mb-8 leading-relaxed">
        The requested medical portal page or clinical record URL could not be found.
      </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Link to="/">
          <Button variant="glow" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
