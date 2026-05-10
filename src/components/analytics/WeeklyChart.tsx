import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useTasks } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { format, subDays, isSameDay } from 'date-fns';

export function WeeklyChart() {
  const { tasks } = useTasks();
  const { theme } = useTheme();

  // Generate last 7 days of data
  const chartData = React.useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const dayTasks = tasks.filter(t => t.date === dateStr);
      const completed = dayTasks.filter(t => t.status === 'DONE').length;
      const total = dayTasks.length;
      
      // Target is semi-static but feels dynamic
      const target = total > 0 ? Math.max(total, 3) : 3; 

      return {
        day: format(date, 'EEE'),
        completed,
        target,
        fullDate: dateStr
      };
    });
  }, [tasks]);

  const isDark = theme === 'dark';
  const barColor = isDark ? '#7C3AED' : '#4F46E5';
  const gridColor = isDark ? '#334155' : '#E5E7EB';
  const textColor = isDark ? '#CBD5E1' : '#475569';
  const tooltipBg = isDark ? '#0F172A' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white transition-colors">Task Performance</h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 uppercase tracking-widest transition-colors">7 Day completion metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: barColor }}></div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors">Tasks Completed</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: textColor, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: textColor, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', radius: 8 }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div 
                      className="p-4 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 scale-100"
                      style={{ 
                        backgroundColor: tooltipBg, 
                        border: `1px solid ${tooltipBorder}`
                      }}
                    >
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">{label}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-12">
                          <span className="text-xs font-bold" style={{ color: textColor }}>Completed</span>
                          <span className="text-sm font-black" style={{ color: barColor }}>{payload[0]?.value || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="completed" fill={barColor} radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
