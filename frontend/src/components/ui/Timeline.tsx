import React from 'react';
import { cn } from '../../utils/cn';

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category?: string;
  icon?: React.ReactNode;
  status?: 'Completed' | 'Pending' | 'Urgent';
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn('relative flex flex-col gap-6 pl-4 sm:pl-6 border-l-2 border-slate-200 dark:border-slate-800 my-2', className)}>
      {items.map((item) => (
        <div key={item.id} className="relative group">
          {/* Node Icon/Bullet */}
          <div className="absolute -left-[25px] sm:-left-[33px] top-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 shadow-soft-sm group-hover:scale-110 transition-transform duration-200">
            {item.icon || <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />}
          </div>

          {/* Content Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                {item.date}
              </span>
              {item.category && (
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
