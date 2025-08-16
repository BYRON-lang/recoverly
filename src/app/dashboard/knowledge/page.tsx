'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { BookOpen, FileText, HelpCircle, ChevronRight } from 'lucide-react';

export default function KnowledgeHubPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const recoveryGuides = [
    { id: 1, title: 'How to recover a hacked account', duration: '5 min read' },
    { id: 2, title: 'Securing your personal information', duration: '8 min read' },
    { id: 3, title: 'Two-factor authentication setup guide', duration: '4 min read' },
  ];

  const securityTips = [
    { id: 1, title: 'Creating strong passwords', duration: '3 min read' },
    { id: 2, title: 'Spotting phishing attempts', duration: '6 min read' },
    { id: 3, title: 'Secure browsing practices', duration: '5 min read' },
  ];

  const faqs = [
    {
      question: 'How do I know if my account has been compromised?',
      answer: 'Look for unusual activity such as unauthorized logins, password changes, or unfamiliar transactions.'
    },
    {
      question: 'What should I do if I suspect fraud?',
      answer: 'Immediately change your password, enable two-factor authentication, and contact our support team.'
    },
    {
      question: 'How can I make my account more secure?',
      answer: 'Use a strong, unique password, enable two-factor authentication, and be cautious of suspicious emails or links.'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414] overflow-hidden">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="knowledge" />
        <div className="flex-1 flex flex-col h-full transition-all duration-200 pt-5">
          <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
            <div className={`mx-auto w-full h-full transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Knowledge Hub</h1>
                <p className="text-gray-500 dark:text-gray-400">Find guides, tutorials, and answers to common questions</p>
              </div>
              
              <div className="space-y-6">
                {/* Recovery Guides Section */}
                <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                  <button 
                    onClick={() => toggleSection('recovery')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                  >
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Step-by-step Recovery Guides</h2>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'recovery' ? 'transform rotate-90' : ''}`} />
                  </button>
                  
                  {expandedSection === 'recovery' && (
                    <div className="px-6 pb-4 pt-2 border-t border-gray-100 dark:border-[#333]">
                      <div className="space-y-3">
                        {recoveryGuides.map((guide) => (
                          <a
                            key={guide.id}
                            href="#"
                            className="block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors group"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {guide.title}
                              </h3>
                              <span className="text-sm text-gray-500">{guide.duration}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                          View all recovery guides
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Tips Section */}
                <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                  <button 
                    onClick={() => toggleSection('security')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-500 mr-3" />
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Security Tips & Tutorials</h2>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'security' ? 'transform rotate-90' : ''}`} />
                  </button>
                  
                  {expandedSection === 'security' && (
                    <div className="px-6 pb-4 pt-2 border-t border-gray-100 dark:border-[#333]">
                      <div className="space-y-3">
                        {securityTips.map((tip) => (
                          <a
                            key={tip.id}
                            href="#"
                            className="block p-3 rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors group"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                                {tip.title}
                              </h3>
                              <span className="text-sm text-gray-500">{tip.duration}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                          View all security tips
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Section */}
                <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                  <button 
                    onClick={() => toggleSection('faq')}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                  >
                    <div className="flex items-center">
                      <HelpCircle className="w-5 h-5 text-purple-500 mr-3" />
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'faq' ? 'transform rotate-90' : ''}`} />
                  </button>
                  
                  {expandedSection === 'faq' && (
                    <div className="px-6 pb-4 pt-2 border-t border-gray-100 dark:border-[#333]">
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div key={index} className="border-b border-gray-100 dark:border-[#333] pb-3 last:border-0 last:pb-0">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{faq.question}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                          View all FAQs
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
