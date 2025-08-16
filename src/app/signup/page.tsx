'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      // No need to redirect here - the AuthProvider will handle it
    } catch (err) {
      // Error is already handled in the auth context
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#141414] overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-12 lg:pr-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img src="/logo.png" alt="Recoverly" className="h-12 w-auto" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
              Sign in
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white transition-all duration-200 disabled:opacity-70"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white transition-all duration-200 disabled:opacity-70"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 hover:shadow-md`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1f1f1f] text-gray-500 dark:text-gray-400">
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
              <FaLock className="h-12 w-12" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Create an account to unlock all features and start your journey with us.
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
              <p className="ml-3 text-sm text-gray-300">No credit card required</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-100/20">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L4 10.586l-1.293-1.293z" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-sm text-gray-300">14-day free trial</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-100/20">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L4 10.586l-1.293-1.293z" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-sm text-gray-300">Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
