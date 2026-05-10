import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { TaskList } from '../components/tasks/TaskList';
import { Tag, Flag, CheckCircle2, ListFilter, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { Priority } from '../types';

export default function FiltersPage() {
  const { tasks, toggleTask, deleteTask, updateTaskStatus } = useTasks();
  const [activeFilter, setActiveFilter] = React.useState<'category' | 'priority'>('category');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(tasks.map(t => t.category || 'General')));
  const priorities: Priority[] = ['HIGH', 'MED', 'LOW'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">Filters & Search</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">Organize and find your tasks by attributes.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick search..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs dark:text-white font-medium focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit border border-transparent dark:border-slate-800 transition-colors">
        <button 
          onClick={() => setActiveFilter('category')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
            activeFilter === 'category' ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          )}
        >
          <Tag size={16} />
          Category
        </button>
        <button 
          onClick={() => setActiveFilter('priority')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
            activeFilter === 'priority' ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          )}
        >
          <Flag size={16} />
          Priority
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {activeFilter === 'category' ? (
          (categories as string[]).map(cat => {
            const catTasks = filteredTasks.filter(t => (t.category || 'General') === cat);
            if (catTasks.length === 0) return null;
            return (
              <div key={cat}>
                <TaskList 
                  title={cat}
                  tasks={catTasks}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  onStatusChange={updateTaskStatus}
                />
              </div>
            );
          })
        ) : (
          priorities.map(prio => {
            const prioTasks = filteredTasks.filter(t => t.priority === prio);
            if (prioTasks.length === 0) return null;
            return (
              <div key={prio}>
                <TaskList 
                  title={prio as string}
                  tasks={prioTasks}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  onStatusChange={updateTaskStatus}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
