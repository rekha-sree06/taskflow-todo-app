import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { TaskList } from '../components/tasks/TaskList';

export default function ArchivePage() {
  const { tasks, toggleTask, deleteTask, updateTaskStatus } = useTasks();
  const archivedTasks = tasks.filter(t => t.status === 'DONE' || t.status === 'CANCELLED' || t.status === 'POSTPONED');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">Archive</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">History of completed and cancelled tasks.</p>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 transition-colors">
            {archivedTasks.length} {archivedTasks.length === 1 ? 'Task' : 'Tasks'} Total
          </span>
        </div>
      </div>

      <div className="max-w-4xl">
        <TaskList 
          tasks={archivedTasks} 
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onStatusChange={updateTaskStatus}
        />
      </div>
    </div>
  );
}
