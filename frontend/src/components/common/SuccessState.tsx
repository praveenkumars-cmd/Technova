import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface SuccessStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title,
  message,
  actionText = 'Continue to Dashboard',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 my-4">
      <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mt-1 mb-6 leading-relaxed">
        {message}
      </p>
      {onAction && (
        <Button variant="success" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
