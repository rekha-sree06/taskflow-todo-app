import React from 'react';
import { User, Bell, Palette, Shield, CreditCard, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const settingsSections = [
  { id: 'account', icon: User, label: 'Account Profile', description: 'Manage your personal details' },
  { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Configure how you stay updated' },
  { id: 'appearance', icon: Palette, label: 'Appearance', description: 'Customize the look and feel' },
  { id: 'security', icon: Shield, label: 'Security', description: 'Keep your workspace safe' },
  { id: 'billing', icon: CreditCard, label: 'Billing', description: 'Manage your subscriptions' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('account');

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">Manage your personal profile and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <nav className="lg:col-span-4 space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl transition-all border text-left group",
                activeTab === section.id 
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm text-indigo-600" 
                  : "bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  activeTab === section.id ? "bg-indigo-50 dark:bg-indigo-500/10" : "bg-slate-50 dark:bg-slate-950 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"
                )}>
                  <section.icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold truncate dark:text-white group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{section.label}</h3>
                  <p className="text-[11px] font-medium opacity-60 truncate dark:text-slate-400 transition-colors">{section.description}</p>
                </div>
              </div>
              <ChevronRight size={16} className={cn(
                "transition-transform",
                activeTab === section.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100"
              )} />
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <section className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 transition-colors shadow-sm">
           {activeTab === 'account' ? (
             <>
               <div className="flex items-center gap-6">
                  <div className="relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 dark:border-slate-800 transition-colors" 
                      alt="Avatar"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md text-indigo-600 hover:scale-110 active:scale-95 transition-all">
                      <Palette size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Alexander Sterling</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">Product Designer at TaskFlow</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alexander Sterling"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent dark:border-slate-800 rounded-xl px-4 py-3 text-sm dark:text-white font-medium focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="alexander@taskflow.so"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent dark:border-slate-800 rounded-xl px-4 py-3 text-sm dark:text-white font-medium focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition-all"
                    />
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-100 dark:border-slate-800 transition-colors">
                 <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/10 dark:shadow-none hover:bg-indigo-700 active:scale-95 transition-all">
                   Save Changes
                 </button>
               </div>
             </>
           ) : activeTab === 'appearance' ? (
             <AppearanceSettings />
           ) : (
             <div className="p-12 text-center text-slate-400">
               <p className="font-bold">Section under development</p>
               <p className="text-xs mt-1">This preference module will be available in the next release.</p>
             </div>
           )}
        </section>
      </div>
    </div>
  );
}

import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

function AppearanceSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Interface Theme</h4>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => theme !== 'light' && toggleTheme()}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all text-left space-y-3",
              theme === 'light' ? "border-indigo-600 bg-indigo-50/10" : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700">
              <Sun size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Light Mode</p>
              <p className="text-[10px] text-slate-500">Perfect for bright environments</p>
            </div>
          </button>

          <button 
            onClick={() => theme !== 'dark' && toggleTheme()}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all text-left space-y-3",
              theme === 'dark' ? "border-indigo-600 bg-indigo-50/10" : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm border border-slate-700">
              <Moon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</p>
              <p className="text-[10px] text-slate-500">Easier on the eyes at night</p>
            </div>
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Reduced Motion</p>
            <p className="text-xs text-slate-500">Minimize animations throughout the app</p>
          </div>
          <div className="w-12 h-6 bg-slate-100 dark:bg-slate-800 rounded-full relative cursor-pointer opacity-50">
             <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
