'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Shield, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function BreachScannerPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isBreached: boolean;
    breaches?: Array<{ name: string; date: string; description: string }>;
  } | null>(null);

  const checkBreach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock response - in a real app, you would call an API like Have I Been Pwned
      const mockBreaches = Math.random() > 0.5 ? [
        {
          name: 'Example Breach',
          date: '2023-05-15',
          description: 'This is a mock breach for demonstration purposes.'
        }
      ] : [];
      
      setResult({
        isBreached: mockBreaches.length > 0,
        breaches: mockBreaches
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414] overflow-hidden">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="dashboard" />
        <div className="flex-1 flex flex-col h-full transition-all duration-200 pt-5">
          <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
            <div className={`mx-auto w-full h-full transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Data Breach Scanner</h1>
                <p className="text-gray-500 dark:text-gray-400">Check if your email has been compromised in any known data breaches</p>
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Check for Data Breaches</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Enter your email address to see if it has been exposed in any known data breaches.
                    </p>
                    
                    <form onSubmit={checkBreach} className="max-w-md mx-auto">
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-[#252525] dark:text-white"
                          required
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Scanning...
                            </>
                          ) : 'Check Now'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {result && (
                    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                      {result.isBreached ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <div className="flex">
                            <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                Breach Detected
                              </h3>
                              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                <p>Your email was found in {result.breaches?.length} data breach(es).</p>
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Affected Services:</h4>
                                <ul className="space-y-2">
                                  {result.breaches?.map((breach, index) => (
                                    <li key={index} className="text-sm p-3 bg-red-100 dark:bg-red-900/30 rounded-md">
                                      <div className="font-medium">{breach.name}</div>
                                      <div className="text-xs text-red-600 dark:text-red-400">Breach date: {breach.date}</div>
                                      <p className="mt-1 text-red-700 dark:text-red-300">{breach.description}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                          <div className="flex">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                                No Known Breaches Found
                              </h3>
                              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                <p>Good news! No breaches have been found for this email address in our database.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          This is a simulation. In a real application, this would check against actual breach databases.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">How to Stay Safe</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use a Password Manager</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Generate and store unique, strong passwords for each of your accounts.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Enable 2FA</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Add an extra layer of security to your accounts with two-factor authentication.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Be Cautious with Emails</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Don't click on suspicious links or download attachments from unknown senders.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Regularly Update Passwords</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Change your passwords periodically and avoid reusing them across sites.
                        </p>
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
