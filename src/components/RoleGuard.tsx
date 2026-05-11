
import React from 'react';
import { User, UserRole } from '../types';
import { hasRole, hasPermission } from '../lib/permissions';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  user: User | null;
  allowedRoles?: UserRole | UserRole[];
  requiredPermission?: keyof NonNullable<User['permissions']>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  user, 
  allowedRoles, 
  requiredPermission, 
  children, 
  fallback,
  redirectTo
}) => {
  if (!user) {
    if (redirectTo) return <Navigate to={redirectTo} replace />;
    return <>{fallback || null}</>;
  }

  let isAuthorized = true;

  if (allowedRoles) {
    isAuthorized = hasRole(user, allowedRoles);
  }

  if (isAuthorized && requiredPermission) {
    isAuthorized = hasPermission(user, requiredPermission);
  }

  if (!isAuthorized) {
    if (redirectTo) return <Navigate to={redirectTo} replace />;
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
};
