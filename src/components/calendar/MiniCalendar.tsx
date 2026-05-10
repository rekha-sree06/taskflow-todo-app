import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks } from 'date-fns';
import { cn } from '../../lib/utils';

interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function MiniCalendar({ selectedDate, onDateSelect }: MiniCalendarProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const realToday = new Date();

  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const handlePrevWeek = () => onDateSelect(subWeeks(selectedDate, 1));
  const handleNextWeek = () => onDateSelect(addWeeks(selectedDate, 1));

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-slate-900 dark:text-white transition-colors">{format(weekStart, 'MMMM yyyy')}</h2>
        <div className="flex gap-1">
          <button 
            onClick={handlePrevWeek}
            className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNextWeek}
            className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        {days.map((day) => {
          const isToday = isSameDay(day, realToday);
          const isSelected = isSameDay(day, selectedDate);
          
          return (
            <div 
              key={day.toString()} 
              onClick={() => onDateSelect(day)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <span className={cn(
                "text-[11px] font-bold uppercase tracking-wider transition-colors",
                isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              )}>
                {format(day, 'EEE')}
              </span>
              <div className={cn(
                "w-10 h-14 flex flex-col items-center justify-center rounded-xl transition-all border",
                isSelected 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/10 dark:shadow-none scale-110 z-10" 
                  : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              )}>
                <span className="text-sm font-bold">{format(day, 'd')}</span>
                {isToday && <div className={cn("w-1 h-1 rounded-full mt-1", isSelected ? "bg-white" : "bg-indigo-600")}></div>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
