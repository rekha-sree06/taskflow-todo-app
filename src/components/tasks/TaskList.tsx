import React from 'react';
import { Task, Status } from '../../types';
import { TaskCard } from './TaskCard';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  onToggleTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  onStatusChange?: (id: string, status: Status) => void;
}

export function TaskList({ tasks, title, onToggleTask, onDeleteTask, onStatusChange }: TaskListProps) {
  return (
    <section className="space-y-4">
      {title && (
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">{title}</h2>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">{tasks.length} tasks</span>
        </div>
      )}
      
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskCard 
                task={task} 
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onStatusChange={onStatusChange}
              />
            </div>
          ))}
        </AnimatePresence>
        
        {tasks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 transition-colors"
          >
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-700 transition-colors">
               <CheckCircle2 size={24} />
            </div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 transition-colors">All caught up!</p>
            <p className="text-xs text-slate-400 dark:text-slate-600 mt-1 transition-colors">Enjoy your digital stillness.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
