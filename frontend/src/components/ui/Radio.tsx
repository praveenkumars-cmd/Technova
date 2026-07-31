import React from 'react';
import { cn } from '../../utils/cn';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const radioId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-3">
        <input
          type="radio"
          id={radioId}
          ref={ref}
          className={cn(
            'w-4 h-4 mt-0.5 rounded-full border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 bg-white dark:bg-slate-900 cursor-pointer accent-blue-600',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col text-sm">
            {label && (
              <label
                htmlFor={radioId}
                className="font-medium text-slate-800 dark:text-slate-200 cursor-pointer select-none"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
