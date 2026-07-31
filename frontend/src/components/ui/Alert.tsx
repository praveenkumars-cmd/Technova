import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AlertProps {
  type?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className,
  onClose,
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/60 text-red-900 dark:text-red-200',
      icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />,
    },
  };

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 flex items-start gap-3 transition-all',
        styles[type].bg,
        className
      )}
    >
      {styles[type].icon}
      <div className="flex-1 text-xs sm:text-sm leading-relaxed">
        {title && <h4 className="font-bold mb-0.5 tracking-tight">{title}</h4>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
