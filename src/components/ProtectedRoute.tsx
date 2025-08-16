'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // In a real app, you would check the authentication status here
    // This is a simplified example
    const checkAuth = async () => {
      try {
        // Simulate API call to check authentication
        await new Promise(resolve => setTimeout(resolve, 500));
        // For demo purposes, we'll assume the user is always authenticated
        // In a real app, you would check for a valid session/token
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#141414]">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or redirect to login
  }

  return <>{children}</>;
}
