"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const AuthGuard = ({ children, protectedRoutes }: { children: React.ReactNode, protectedRoutes: string[] }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const currentPath = window.location.pathname;
      const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

      if (isProtectedRoute && !isAuthenticated) {
        router.push('/auth');
      } else if (!isProtectedRoute && isAuthenticated && currentPath === '/auth') {
        router.push('/home');
      }
    }
  }, [isAuthenticated, isLoading, router, protectedRoutes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthGuard;