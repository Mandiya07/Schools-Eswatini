import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkflowTask, Notification } from '../../types';

interface WorkflowContextType {
  tasks: WorkflowTask[];
  notifications: Notification[];
  addTask: (task: Omit<WorkflowTask, 'id'>) => void;
  updateTaskStatus: (id: string, status: WorkflowTask['status']) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<WorkflowTask[]>([
    { id: '1', institutionId: 'inst-1', title: 'MoET Registration Renewal', description: 'Your MoET registration is expiring in 45 days.', date: '2024-05-20', type: 'warning', status: 'Pending' } as any,
    { id: '2', institutionId: 'inst-1', title: 'New Admission Inquiry', description: 'Sipho Dlamini inquired about IB Diploma program.', date: '2024-04-10', type: 'info', status: 'New' } as any,
    { id: '3', institutionId: 'inst-1', title: 'Staff Certification Audit', description: 'Annual review of staff teaching certifications.', date: '2024-04-15', type: 'success', status: 'In Progress' } as any
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', userId: 'user-1', title: 'System Update', message: 'Platform maintenance scheduled for tonight.', type: 'info', isRead: false, createdAt: new Date().toISOString() },
    { id: 'n2', userId: 'user-1', title: 'New Inquiry', message: 'You have a new student inquiry.', type: 'success', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() }
  ]);

  const addTask = (task: Omit<WorkflowTask, 'id'>) => {
    const newTask: WorkflowTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTaskStatus = (id: string, status: WorkflowTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Simulate automated workflow triggers
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate a notification every 30 seconds for demonstration
      if (Math.random() > 0.7) {
        addNotification({
          userId: 'user-1',
          title: 'Automated Alert',
          message: 'A new automated workflow task has been generated.',
          type: 'info'
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WorkflowContext.Provider value={{ tasks, notifications, addTask, updateTaskStatus, addNotification, markNotificationAsRead, clearNotifications }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
