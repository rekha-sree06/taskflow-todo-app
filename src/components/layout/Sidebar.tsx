import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ListFilter, 
  Archive as ArchiveIcon, 
  Settings as SettingsIcon, 
  HelpCircle, 
  LogOut, 
  CheckCircle2,
  LayoutDashboard,
  X,
  Users,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Modal } from '../ui/Modal';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Upcoming', path: '/upcoming' },
  { icon: ListFilter, label: 'Filters', path: '/filters' },
  { icon: ArchiveIcon, label: 'Archive', path: '/archive' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false); // Sidebar help trigger

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <aside className={cn(
        "w-[280px] h-screen fixed left-0 top-0 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-50 transition-all duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col p-6 gap-6 h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 dark:shadow-none">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">TaskFlow</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Digital Stillness</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden transition-colors"
            >
              <X size={20} />
            </button>
          </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-1 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-500/20 dark:shadow-none" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
          
          <button
            onClick={() => setShowTeamsModal(true)}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white transition-all duration-200 group font-bold"
          >
            <Users size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm">Teams</span>
            <span className="ml-auto text-[9px] font-black tracking-widest bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-1.5 py-0.5 rounded">SOON</span>
          </button>
        </nav>

        {/* Footer Nav */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <button 
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-all rounded-xl group"
          >
            <HelpCircle size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Help</span>
          </button>
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 w-full p-3 text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all rounded-xl group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>

    <Modal
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      title="Sign Out"
      size="sm"
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-600">
          <AlertCircle size={32} />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-bold text-slate-900 dark:text-white">Sign out of TaskFlow?</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">You will need to sign back in to access your digital workspace.</p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <button 
            onClick={handleLogout}
            className="w-full py-3 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 dark:shadow-none"
          >
            Sign Out
          </button>
          <button 
            onClick={() => setShowLogoutModal(false)}
            className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    <Modal
      isOpen={showTeamsModal}
      onClose={() => setShowTeamsModal(false)}
      title="Team Collaboration"
      size="md"
    >
      <div className="text-center space-y-8 py-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-600 rotate-3">
            <Users size={48} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg border-2 border-white dark:border-slate-900 animate-bounce">
            WAITLIST
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Digital Sync & Collaboration</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-loose max-w-sm mx-auto font-medium">
            We're architecting a new way for high-performance teams to maintain digital stillness together. 
            Join the waitlist to be first in line.
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-3 max-w-xs mx-auto">
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 px-6 text-sm font-medium focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all"
          />
          <button 
            onClick={() => setShowTeamsModal(false)}
            className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 dark:shadow-none"
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </Modal>

    <Modal 
      isOpen={showHelp} 
      onClose={() => setShowHelp(false)} 
      title="How can we help?"
      size="md"
    >
      <div className="space-y-6">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
          <p className="text-sm font-bold text-indigo-900 dark:text-indigo-400 mb-1">Getting Started</p>
          <p className="text-xs text-indigo-700 dark:text-indigo-300/70 leading-relaxed font-medium">New tasks can be added from the dashboard. Use the sidebar to filter by category or priority.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</span>
            <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">VIEW ALL</span>
          </button>
          <button className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
            <span className="text-sm font-bold text-slate-900 dark:text-white">API Documentation</span>
            <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">READ DOCS</span>
          </button>
        </div>
        <button className="w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          Contact Support
        </button>
      </div>
    </Modal>
    </>
  );
}
