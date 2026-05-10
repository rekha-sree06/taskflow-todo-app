import React from 'react';
import { Plus, Send, Clock, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewTaskInputProps {
  onAdd: (title: string, time?: string) => void;
}

export function NewTaskInput({ onAdd }: NewTaskInputProps) {
  const [title, setTitle] = React.useState('');
  const [time, setTime] = React.useState('');
  const [showTime, setShowTime] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), showTime && time ? time : undefined);
      setTitle('');
      setTime('');
      setShowTime(false);
    }
  };

  return (
    <div className="space-y-2">
      <form 
        onSubmit={handleSubmit}
        className={cn(
        "relative flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all duration-300 shadow-sm",
        isFocused 
          ? "border-indigo-600 shadow-xl shadow-indigo-500/10" 
          : "border-slate-100 dark:border-slate-800 border-dashed hover:border-indigo-200 dark:hover:border-indigo-800"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors",
        title.trim() ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
      )}>
        <Plus size={16} />
      </div>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What needs to be done?"
        className="flex-1 bg-transparent border-none p-0 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0"
      />

      <div className="flex items-center gap-2">
        {!showTime && (
          <button
            type="button"
            onClick={() => setShowTime(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Add time"
          >
              <Clock size={18} />
            </button>
          )}

          {title.trim() && (
            <button
              type="submit"
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all animate-in fade-in zoom-in duration-200"
            >
              <Send size={14} />
            </button>
          )}
        </div>
      </form>

      {showTime && (
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl animate-in slide-in-from-top-2 duration-200 border border-indigo-100/50 dark:border-indigo-500/20">
          <Clock size={14} className="text-indigo-600" />
          <input 
            type="time" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-transparent border-none p-0 text-xs font-bold text-indigo-600 focus:ring-0"
          />
          <button 
            type="button"
            onClick={() => {
              setShowTime(false);
              setTime('');
            }}
            className="ml-auto p-1 text-indigo-400 hover:text-indigo-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
