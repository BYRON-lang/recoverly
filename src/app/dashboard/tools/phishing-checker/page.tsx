'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Link2, ShieldAlert, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';

export default function PhishingCheckerPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isSafe: boolean | null;
    message: string;
    details?: {
      domainAge?: string;
      sslValid?: boolean;
      suspiciousKeywords?: string[];
    };
  } | null>(null);

  const checkUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock response - in a real app, you would call a URL safety API
      const isSafe = Math.random() > 0.3; // 70% chance of being safe for demo
      
      if (isSafe) {
        setResult({
          isSafe: true,
          message: 'This link appears to be safe.',
          details: {
            domainAge: '2 years',
            sslValid: true,
            suspiciousKeywords: []
          }
        });
      } else {
        setResult({
          isSafe: false,
          message: 'Warning: This link may be unsafe.',
          details: {
            domainAge: '2 days',
            sslValid: false,
            suspiciousKeywords: ['login', 'account', 'verify']
          }
        });
      }
      
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
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Phishing Link Checker</h1>
                <p className="text-gray-500 dark:text-gray-400">Check if a website is safe to visit</p>
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                      <Link2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Check a Suspicious Link</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Enter a URL to check if it's safe or potentially a phishing attempt.
                    </p>
                    
                    <form onSubmit={checkUrl} className="max-w-2xl mx-auto">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-[#252525] dark:text-white"
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
                              Checking...
                            </>
                          ) : 'Check URL'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {result && (
                    <div className="mt-8">
                      <div className={`p-4 rounded-lg ${
                        result.isSafe === null 
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' 
                          : result.isSafe 
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      }`}>
                        <div className="flex">
                          {result.isSafe === null ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                          ) : result.isSafe ? (
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <ShieldAlert className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <h3 className={`text-sm font-medium ${
                              result.isSafe === null 
                                ? 'text-yellow-800 dark:text-yellow-200' 
                                : result.isSafe 
                                  ? 'text-green-800 dark:text-green-200' 
                                  : 'text-red-800 dark:text-red-200'
                            }`}>
                              {result.isSafe === null 
                                ? 'Unable to determine safety' 
                                : result.isSafe 
                                  ? 'Link appears to be safe' 
                                  : 'Potential phishing link detected!'}
                            </h3>
                            <div className={`mt-2 text-sm ${
                              result.isSafe === null 
                                ? 'text-yellow-700 dark:text-yellow-300' 
                                : result.isSafe 
                                  ? 'text-green-700 dark:text-green-300' 
                                  : 'text-red-700 dark:text-red-300'
                            }`}>
                              <p>{result.message}</p>
                              
                              {result.details && (
                                <div className="mt-4 space-y-2">
                                  {result.details.domainAge && (
                                    <div className="flex items-center">
                                      <span className="font-medium mr-2">Domain Age:</span>
                                      <span>{result.details.domainAge}</span>
                                    </div>
                                  )}
                                  {result.details.sslValid !== undefined && (
                                    <div className="flex items-center">
                                      <span className="font-medium mr-2">SSL Certificate:</span>
                                      <span>{result.details.sslValid ? 'Valid' : 'Invalid or Missing'}</span>
                                    </div>
                                  )}
                                  {result.details.suspiciousKeywords && result.details.suspiciousKeywords.length > 0 && (
                                    <div>
                                      <div className="font-medium mb-1">Suspicious Keywords Found:</div>
                                      <div className="flex flex-wrap gap-1">
                                        {result.details.suspiciousKeywords.map((keyword, index) => (
                                          <span key={index} className="px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                                            {keyword}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          This is a simulation. In a real application, this would check against actual phishing databases.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">How to Spot Phishing Links</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Check the URL Carefully</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Hover over links to see the actual URL before clicking. Look for misspellings or unusual characters in the domain name.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Look for HTTPS</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Legitimate websites use HTTPS (look for the padlock icon in the address bar). However, some phishing sites may also use HTTPS, so this isn't a guarantee of safety.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">3. Be Wary of Urgent or Threatening Language</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Phishing attempts often create a sense of urgency, such as claiming your account will be closed if you don't act immediately.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">4. Don't Enter Credentials on Suspicious Pages</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          If you're unsure about a login page, navigate to the website directly rather than clicking a link in an email or message.
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
