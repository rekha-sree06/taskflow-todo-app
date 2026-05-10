import React from 'react';
import { CheckCircle2, Circle, Clock, Tag, Trash2, Calendar, MoreVertical, XCircle, RotateCw } from 'lucide-react';
import { Task, Status } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Status) => void;
}

const priorityStyles = {
  HIGH: 'bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400',
  MED: 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
  LOW: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
};

const statusStyles = {
  TODO: 'bg-white dark:bg-slate-900',
  DONE: 'bg-slate-50 dark:bg-slate-900/40 opacity-60 grayscale',
  CANCELLED: 'bg-slate-50 dark:bg-slate-900/40 opacity-50 italic',
  POSTPONED: 'bg-indigo-50/30 dark:bg-indigo-900/10 opacity-80',
};

export function TaskCard({ task, onToggle, onDelete, onStatusChange }: TaskCardProps) {
  const isDone = task.status === 'DONE';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-all hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg dark:hover:shadow-none bg-white dark:bg-slate-900",
        statusStyles[task.status]
      )}>
      <button 
        onClick={() => onToggle?.(task.id)}
        className={cn(
          "flex-shrink-0 transition-all active:scale-90",
          isDone ? "text-indigo-600 dark:text-indigo-500" : "text-slate-300 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-500"
        )}
      >
        {isDone ? <CheckCircle2 size={24} fill="currentColor" fillOpacity={0.1} /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md",
            priorityStyles[task.priority]
          )}>
            {task.priority}
          </span>
          {task.status !== 'TODO' && (
            <span className="bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest">
              {task.status}
            </span>
          )}
        </div>
        
        <h3 className={cn(
          "text-sm font-semibold truncate transition-colors",
          isDone ? "line-through text-slate-400 dark:text-slate-600" : "text-slate-900 dark:text-white"
        )}>
          {task.title}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            <Calendar size={10} />
            <span>{task.date}</span>
          </div>
          {task.time && (
            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              <Clock size={10} />
              <span>{task.time}</span>
            </div>
          )}
          {task.category && (
            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              <Tag size={10} />
              <span>{task.category}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
        {task.status === 'TODO' && (
          <button 
            onClick={() => onStatusChange?.(task.id, 'POSTPONED')}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Postpone"
          >
            <Clock size={16} />
          </button>
        )}
        {(task.status === 'POSTPONED' || task.status === 'CANCELLED') && (
          <button 
            onClick={() => onStatusChange?.(task.id, 'TODO')}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Restore"
          >
            <RotateCw size={16} />
          </button>
        )}
        {task.status === 'TODO' && (
          <button 
            onClick={() => onStatusChange?.(task.id, 'CANCELLED')}
            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Cancel"
          >
            <XCircle size={16} />
          </button>
        )}
        <button 
          onClick={() => onDelete?.(task.id)}
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
