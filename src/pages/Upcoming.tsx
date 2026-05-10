import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { TaskList } from '../components/tasks/TaskList';
import { NewTaskInput } from '../components/tasks/NewTaskInput';
import { ListFilter, Grid2X2 } from 'lucide-react';
import { addDays, format, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';

export default function Upcoming() {
  const { tasks, toggleTask, deleteTask, updateTaskStatus, addTask } = useTasks();
  const upcomingTasks = tasks.filter(t => t.status === 'TODO');

  const tomorrow = addDays(new Date(), 1);
  const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');
  
  const tomorrowTasks = upcomingTasks.filter(t => t.date === tomorrowStr);
  
  // This Weekend logic
  const now = new Date();
  const weekendStart = addDays(startOfWeek(now, { weekStartsOn: 1 }), 5); // Saturday
  const weekendEnd = addDays(startOfWeek(now, { weekStartsOn: 1 }), 6); // Sunday
  
  const thisWeekendTasks = upcomingTasks.filter(t => {
    try {
      const taskDate = new Date(t.date);
      return isWithinInterval(taskDate, { start: weekendStart, end: weekendEnd });
    } catch (e) {
      return false;
    }
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">Upcoming</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 transition-colors">Plan your week with ease.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <Grid2X2 size={20} className="text-slate-500 dark:text-slate-400" />
          </button>
          <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <ListFilter size={20} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-4">
            <NewTaskInput onAdd={(title, time) => addTask(title, time, tomorrowStr)} />
            <TaskList 
              title={`Tomorrow (${format(tomorrow, 'MMM d')})`} 
              tasks={tomorrowTasks} 
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onStatusChange={updateTaskStatus}
            />
          </div>
          
          <TaskList 
            title="This Weekend" 
            tasks={thisWeekendTasks} 
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onStatusChange={updateTaskStatus}
          />
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <ListFilter size={120} />
             </div>
             <div className="relative z-10 space-y-4">
               <h4 className="font-black text-xl tracking-tight">Planning Pro</h4>
               <p className="text-sm opacity-90 leading-relaxed font-bold">
                 You have {upcomingTasks.length} pending tasks for the next 7 days. Break them down into smaller steps to maintain your focus.
               </p>
               <button className="px-6 py-2 bg-white text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/10 dark:shadow-none">
                 Learn More
               </button>
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
