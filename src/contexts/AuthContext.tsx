'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token and get user data
          // const response = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
          // const userData = await response.json();
          // setUser(userData);
          
          // For demo purposes, we'll just set a mock user
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com'
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your authentication API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // For demo purposes, we'll simulate a successful login
      if (email && password) {
        const mockUser = {
          id: '1',
          name: email.split('@')[0],
          email
        };
        
        // In a real app, you would get this from the API response
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        setUser(mockUser);
        router.push('/dashboard');
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your registration API
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });
      // const data = await response.json();
      
      // For demo purposes, we'll simulate a successful registration
      if (name && email && password) {
        const mockUser = { id: '1', name, email };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        setUser(mockUser);
        router.push('/dashboard');
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Component
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#141414]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};
