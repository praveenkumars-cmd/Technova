import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: React.ReactNode;
  description?: string;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  description,
  iconBgColor = 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
}) => {
  return (
    <Card hoverEffect className="p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={cn('p-3 rounded-2xl shrink-0', iconBgColor)}>
          {icon}
        </div>
      </div>

      {(change || description) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          {change && (
            <div
              className={cn(
                'flex items-center gap-1 font-semibold',
                changeType === 'positive' && 'text-emerald-600 dark:text-emerald-400',
                changeType === 'negative' && 'text-red-600 dark:text-red-400',
                (changeType === 'neutral' || changeType === 'warning') && 'text-amber-600 dark:text-amber-400'
              )}
            >
              {changeType === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
              {changeType === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
              {(changeType === 'neutral' || changeType === 'warning') && <Minus className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
          {description && (
            <span className="text-slate-500 dark:text-slate-400 ml-auto">{description}</span>
          )}
        </div>
      )}
    </Card>
  );
};
