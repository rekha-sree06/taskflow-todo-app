import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, HelpCircle, Menu, CheckCircle2, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationsDropdown } from '../ui/NotificationsDropdown';
import { Modal } from '../ui/Modal';
import { cn } from '../../lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-16 flex justify-between items-center px-4 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuToggle}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl md:hidden transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, projects, insights..." 
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm dark:text-white focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all outline-none"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-bold text-slate-900 dark:text-white border-b-2 border-indigo-600 pb-1 pt-1">Activity</a>
          <a href="#" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors">Teams</a>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all relative",
              showNotifications && "bg-slate-100 dark:bg-slate-800 text-indigo-600"
            )}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                >
                  <NotificationsDropdown />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-amber-400" />}
        </button>
        
        <button 
          onClick={() => setShowHelp(true)}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors hidden sm:flex"
        >
          <HelpCircle size={20} />
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-3 pl-1">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-300 transition-all"
          />
        </div>
      </div>

      <Modal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
        title="Help & Support"
        size="md"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-indigo-600" />
              Frequently Asked Questions
            </h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">How do I add a task?</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Click on the "New task..." input field on your dashboard and hit Enter to save.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Can I sync my data?</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Currently, your data is saved locally on your device. Cloud sync is coming in the next update.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap size={18} className="text-indigo-600" />
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-tight">
              <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">New Task</span>
                <span className="text-indigo-600">Enter</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">Theme</span>
                <span className="text-indigo-600">⌘ + D</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
             <button className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/10 dark:shadow-none hover:bg-indigo-700 transition-all">
               Contact Support
             </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}

