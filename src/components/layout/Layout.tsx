import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main Content Area */}
      <main className="md:ml-[280px] pt-16 min-h-screen transition-all duration-300 ease-in-out">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
