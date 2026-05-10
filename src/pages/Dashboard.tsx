import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { TaskList } from '../components/tasks/TaskList';
import { NewTaskInput } from '../components/tasks/NewTaskInput';
import { WeeklyChart } from '../components/analytics/WeeklyChart';
import { MiniCalendar } from '../components/calendar/MiniCalendar';
import { FireExtinguisher, Flame, Zap, Trophy, Lightbulb, CheckCircle2 } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask, updateTaskStatus } = useTasks();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const todayStr = new Date().toISOString().split('T')[0];
  const selectedStr = selectedDate.toISOString().split('T')[0];
  
  const upcomingTasks = tasks.filter(t => t.status === 'TODO');
  const completedToday = tasks.filter(t => t.status === 'DONE' && t.date === todayStr).length;
  const totalTasksToday = tasks.filter(t => t.date === todayStr).length;
  const successRate = totalTasksToday > 0 ? Math.round((completedToday / totalTasksToday) * 100) : 0;
  const totalCompleted = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">You have {upcomingTasks.length} tasks in total to focus on.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 transition-colors">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Zap size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Flow</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{successRate}%</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tasks</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{totalCompleted}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Flame size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Streak</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">12</p>
              </div>
            </div>
          </div>

          <MiniCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

          <div className="space-y-4">
            <NewTaskInput onAdd={(title, time) => addTask(title, time, selectedStr)} />
            <TaskList 
              title={selectedStr === todayStr ? "Today's Focus" : `Focus for ${format(selectedDate, 'MMM d')}`} 
              tasks={tasks.filter(t => t.date === selectedStr)} 
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onStatusChange={updateTaskStatus}
            />
          </div>
        </div>

        {/* Right Sidebar Column */}
        <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
          {/* Efficiency Card */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center transition-colors shadow-sm">
            <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">DAILY FOCUS</h3>
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  className="text-slate-100 dark:text-slate-800/50 transition-colors" 
                  cx="80" cy="80" r="74" 
                  fill="transparent" stroke="currentColor" strokeWidth="10" 
                />
                <circle 
                  className="text-indigo-600 dark:text-indigo-500 transition-all duration-1000 ease-out" 
                  cx="80" cy="80" r="74" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="10" 
                  strokeDasharray="464.7" 
                  strokeDashoffset={464.7 - (464.7 * successRate) / 100}
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">{successRate}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">% DONE</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-bold px-4">
              You've finished {completedToday} tasks today. Your focus is sharp!
            </p>
            <button className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white font-bold rounded-2xl text-sm transition-all hover:bg-slate-800 dark:hover:bg-indigo-700 shadow-xl shadow-slate-200 dark:shadow-indigo-500/10">
              View Analytics
            </button>
          </section>

          {/* Activity Section */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">ACHIEVEMENTS</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  totalCompleted >= 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}>
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className={cn("text-sm font-bold transition-colors", totalCompleted >= 1 ? "text-slate-900 dark:text-white" : "text-slate-400")}>First Step</h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Complete your first task</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  totalCompleted >= 5 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}>
                  <Trophy size={18} />
                </div>
                <div>
                  <h4 className={cn("text-sm font-bold transition-colors", totalCompleted >= 5 ? "text-slate-900 dark:text-white" : "text-slate-400")}>High Five</h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Complete 5 tasks</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  totalCompleted >= 10 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/10" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}>
                  <Flame size={18} />
                </div>
                <div>
                  <h4 className={cn("text-sm font-bold transition-colors", totalCompleted >= 10 ? "text-slate-900 dark:text-white" : "text-slate-400")}>On Fire</h4>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Complete 10 tasks</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quote Card */}
          <div className="bg-slate-900 p-6 rounded-2xl relative overflow-hidden text-white group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lightbulb size={64} />
            </div>
            <p className="text-sm font-medium italic relative z-10 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
              "The high-key light mode aesthetic combined with soft shadows creates a sense of digital stillness."
            </p>
            <div className="mt-4 flex items-center gap-2 relative z-10">
              <div className="w-6 h-px bg-white opacity-20"></div>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">Insight</span>
            </div>
          </div>
        </aside>
      </div>

      <WeeklyChart />
    </div>
  );
}
