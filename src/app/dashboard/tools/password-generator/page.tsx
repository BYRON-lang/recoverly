'use client';

import { useState, useCallback } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Key, Copy, Check, RefreshCw } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    
    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars.length) {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    
    setPassword(newPassword);
    setCopied(false);
  }, [length, options]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414] overflow-hidden">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="dashboard" />
        <div className="flex-1 flex flex-col h-full transition-all duration-200 pt-5">
          <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
            <div className={`mx-auto w-full h-full transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Password Generator</h1>
                <p className="text-gray-500 dark:text-gray-400">Create strong, secure passwords to keep your accounts safe</p>
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8">
                    <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                      <Key className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">Generate a Secure Password</h2>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      Create a strong, random password to secure your accounts
                    </p>
                  </div>

                  {/* Password Output */}
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={password}
                        readOnly
                        className="w-full px-4 py-3 pr-12 text-lg font-mono bg-gray-50 dark:bg-[#252525] border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your secure password will appear here"
                      />
                      <button
                        onClick={copyToClipboard}
                        disabled={!password}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 disabled:opacity-50"
                        title={copied ? 'Copied!' : 'Copy to clipboard'}
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-orange-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {password ? `${password.length} characters` : '0 characters'}
                        </span>
                        {password && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            password.length < 8 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                            password.length < 12 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                          }`}>
                            {password.length < 8 ? 'Weak' : password.length < 12 ? 'Good' : 'Strong'}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={generatePassword}
                        className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 flex items-center"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Generate New
                      </button>
                    </div>
                  </div>

                  {/* Password Options */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Length: {length}</label>
                        <span className="text-sm text-gray-500">{length} characters</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>4</span>
                        <span>8</span>
                        <span>12</span>
                        <span>16</span>
                        <span>20</span>
                        <span>24</span>
                        <span>28</span>
                        <span>32</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={options.uppercase}
                          onChange={() => toggleOption('uppercase')}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={options.lowercase}
                          onChange={() => toggleOption('lowercase')}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={options.numbers}
                          onChange={() => toggleOption('numbers')}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={options.symbols}
                          onChange={() => toggleOption('symbols')}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$%^&*)</span>
                      </label>
                    </div>
                  </div>

                  {/* Password Strength Tips */}
                  <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Password Strength Tips</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Use at least 12 characters</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Longer passwords are harder to crack.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Mix character types</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Use upper and lower case letters, numbers, and symbols.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Avoid common words</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Don't use easily guessable words or patterns.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Use a password manager</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Store and manage your passwords securely.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
