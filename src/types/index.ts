export type Priority = 'LOW' | 'MED' | 'HIGH';
export type Status = 'TODO' | 'DONE' | 'CANCELLED' | 'POSTPONED';

export interface Task {
  id: string;
  title: string;
  date: string;
  time?: string;
  priority: Priority;
  status: Status;
  category?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}
