import { Task, Achievement } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Quarterly Financial Review',
    date: '2023-10-12',
    time: '09:00 AM',
    priority: 'HIGH',
    status: 'DONE',
    category: 'Finance',
  },
  {
    id: '2',
    title: 'Onsite Workshop - San Francisco',
    date: '2023-10-08',
    priority: 'MED',
    status: 'CANCELLED',
    category: 'Work',
  },
  {
    id: '3',
    title: 'User Interview Transcripts',
    date: '2023-09-24',
    priority: 'LOW',
    status: 'DONE',
    category: 'Research',
  },
  {
    id: '4',
    title: 'Internal Design Audit',
    date: '2023-09-15',
    priority: 'MED',
    status: 'DONE',
    category: 'Design',
  },
  {
    id: '5',
    title: 'Q4 Strategy Presentation',
    date: '2023-10-24',
    time: '09:30 AM',
    priority: 'HIGH',
    status: 'TODO',
    category: 'Work',
  },
  {
    id: '6',
    title: 'Brand Refresh Sync',
    date: '2023-10-24',
    time: '10:30 AM',
    priority: 'MED',
    status: 'TODO',
    category: 'Design',
  },
  {
    id: '7',
    title: 'Grocery Run: Meal Prep Week 4',
    date: '2023-10-26',
    priority: 'LOW',
    status: 'TODO',
    category: 'Personal',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Flow State',
    description: '4h deep work yesterday',
    icon: 'auto_awesome',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: '2',
    title: 'Consistent',
    description: '3-day completion streak',
    icon: 'flash_on',
  },
  {
    id: '3',
    title: 'Top 5%',
    description: 'User consistency rank',
    icon: 'hotel_class',
  },
];
