"use client";

import Link from 'next/link';
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // No need to redirect here - the AuthProvider will handle it
    } catch (err) {
      // Error is already handled in the auth context
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#141414] overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-12 lg:pr-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/">
              <img src="/logo.png" alt="Recoverly" className="h-12 w-auto hover:opacity-90 transition-opacity" />
            </Link>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Sign in to account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white transition-all duration-200 disabled:opacity-70"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white transition-all duration-200 disabled:opacity-70"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 dark:border-gray-700 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 hover:shadow-md`}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#141414] text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-[#1f1f1f] text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-200"
                >
                  <FaGoogle className="h-5 w-5" />
                  <span className="ml-2">Google</span>
                </a>

                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-[#1f1f1f] text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-200"
                >
                  <FaGithub className="h-5 w-5" />
                  <span className="ml-2">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black items-center justify-center p-12 rounded-l-3xl">
        <div className="max-w-md text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-full">
              <FaShieldAlt className="h-12 w-12" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4">Secure Access to Your Data</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Your data is protected with industry-leading security measures and end-to-end encryption.
          </p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-100/20">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L4 10.586l-1.293-1.293z" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-sm text-gray-300">End-to-end encryption</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-100/20">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L4 10.586l-1.293-1.293z" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-sm text-gray-300">Two-factor authentication</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-100/20">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L4 10.586l-1.293-1.293z" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-sm text-gray-300">24/7 security monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
