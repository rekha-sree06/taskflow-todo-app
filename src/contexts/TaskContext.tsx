import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Task, Status } from '../types';
import { mockTasks } from '../data/mockData';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, time?: string, date?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
  updateTaskStatus: (id: string, status: Status) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse tasks', e);
      }
    }
    return mockTasks;
  });

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, time?: string, date?: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      date: date || new Date().toISOString().split('T')[0],
      time,
      priority: 'MED',
      status: 'TODO',
      category: 'General'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'DONE' ? 'TODO' : 'DONE' } : t
    ));
  };

  const updateTaskStatus = (id: string, status: Status) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const value = useMemo(() => ({ 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    updateTask, 
    updateTaskStatus 
  }), [tasks]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
