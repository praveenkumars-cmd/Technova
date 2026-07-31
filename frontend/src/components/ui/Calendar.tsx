import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CalendarProps {
  selectedDate?: string; // YYYY-MM-DD
  onDateSelect?: (dateStr: string) => void;
  highlightDates?: string[];
  minDate?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  highlightDates = [],
  minDate,
}) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    return selectedDate ? new Date(selectedDate) : new Date();
  });

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const formatDateStr = (d: number) => {
    const m = (month + 1).toString().padStart(2, '0');
    const day = d.toString().padStart(2, '0');
    return `${year}-${m}-${day}`;
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-soft-sm select-none">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
          {monthNames[month]} {year}
        </h4>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Empty cells before 1st of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}

        {/* Month days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = formatDateStr(dayNum);
          const isSelected = selectedDate === dateStr;
          const isHighlighted = highlightDates.includes(dateStr);
          const isDisabled = minDate && dateStr < minDate;

          return (
            <button
              key={dateStr}
              disabled={!!isDisabled}
              onClick={() => onDateSelect && onDateSelect(dateStr)}
              className={cn(
                'relative p-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex flex-col items-center justify-center h-9 sm:h-10',
                isSelected
                  ? 'bg-blue-600 text-white font-bold shadow-soft-sm dark:bg-blue-500'
                  : isHighlighted
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
                isDisabled && 'opacity-30 cursor-not-allowed hover:bg-transparent'
              )}
            >
              <span>{dayNum}</span>
              {isHighlighted && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
