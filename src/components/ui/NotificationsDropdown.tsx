import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { Bell, CheckCircle2, Clock, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export function NotificationsDropdown() {
  const { tasks } = useTasks();
  
  const notifications = [
    {
      id: 1,
      title: "Task completed",
      description: "You've finished your morning focus session.",
      time: "2 mins ago",
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    {
      id: 2,
      title: "Productivity Streak",
      description: "5 days in a row! You're on fire.",
      time: "1 hour ago",
      icon: <Zap size={16} className="text-amber-500" />,
      bg: "bg-amber-50 dark:bg-amber-500/10"
    },
    {
      id: 3,
      title: "Upcoming reminder",
      description: "Don't forget your team sync at 4:30 PM.",
      time: "3 hours ago",
      icon: <Clock size={16} className="text-indigo-500" />,
      bg: "bg-indigo-50 dark:bg-indigo-500/10"
    },
    {
      id: 4,
      title: "System Update",
      description: "New features have been added to your dashboard.",
      time: "Yesterday",
      icon: <Info size={16} className="text-slate-500" />,
      bg: "bg-slate-50 dark:bg-slate-500/10"
    }
  ];

  return (
    <div className="w-80 max-h-[480px] overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h4 className="font-bold text-slate-900 dark:text-white">Notifications</h4>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full">
          4 NEW
        </span>
      </div>
      <div className="overflow-y-auto max-h-[400px] p-2 space-y-1">
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-xl ${notif.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate">{notif.title}</h5>
                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                {notif.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <button className="w-full py-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          Mark all as read
        </button>
      </div>
    </div>
  );
}
