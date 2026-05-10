/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Upcoming from './pages/Upcoming';
import ArchivePage from './pages/Archive';
import SettingsPage from './pages/Settings';
import FiltersPage from './pages/Filters';

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/filters" element={<FiltersPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}
