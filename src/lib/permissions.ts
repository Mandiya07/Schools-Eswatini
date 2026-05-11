
import { User, UserRole } from '../../types';

export const hasRole = (user: User | null, roles: UserRole | UserRole[]): boolean => {
  if (!user) return false;
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  return rolesArray.includes(user.role);
};

export const hasPermission = (user: User | null, permission: keyof NonNullable<User['permissions']>): boolean => {
  if (!user) return false;
  
  // Super Admins have all permissions
  if (user.role === UserRole.SUPER_ADMIN) return true;
  
  // Institution Admins have all permissions for their institution
  if (user.role === UserRole.INSTITUTION_ADMIN) return true;

  if (!user.permissions) return false;
  return !!user.permissions[permission];
};

export const canAccessInstitution = (user: User | null, institutionId: string): boolean => {
  if (!user) return false;
  if (user.role === UserRole.SUPER_ADMIN) return true;
  return user.institutionId === institutionId;
};

export const isDev = (): boolean => {
  // Check for development bypasses (as seen in App.tsx)
  return window.location.search.includes('se_dev_admin') || 
         window.location.search.includes('se_dev_teacher') ||
         window.location.search.includes('se_dev_parent') ||
         localStorage.getItem('se_dev_admin') === 'true' ||
         localStorage.getItem('se_dev_teacher') === 'true';
};

export const canViewDashboard = (user: User | null): boolean => {
  if (!user) return false;
  return [
    UserRole.SUPER_ADMIN,
    UserRole.INSTITUTION_ADMIN,
    UserRole.TEACHER,
    UserRole.MOET_OFFICIAL,
    UserRole.STUDENT,
    UserRole.PARENT
  ].includes(user.role);
};
