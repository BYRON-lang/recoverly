'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { FileText, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp, File, MessageSquare, Download, PlusCircle } from 'lucide-react';

// Sample data
const cases = [
  {
    id: 'RC-2023-001',
    title: 'Unauthorized Bank Transaction',
    status: 'In Progress',
    date: '2023-08-15',
    lastUpdated: '2 hours ago',
    description: 'Disputed unauthorized transaction of $1,200.00 from checking account.',
    files: [
      { name: 'bank_statement.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'id_verification.jpg', size: '1.2 MB', type: 'image' }
    ],
    messages: [
      { id: 1, sender: 'You', time: '2 hours ago', content: 'I have uploaded the requested documents.' },
      { id: 2, sender: 'Support Team', time: '1 hour ago', content: 'Thank you. We are reviewing your case.' }
    ]
  },
  {
    id: 'RC-2023-002',
    title: 'Credit Card Fraud',
    status: 'Pending',
    date: '2023-08-10',
    lastUpdated: '3 days ago',
    description: 'Reported unauthorized charges on credit card ending in 4532.',
    files: [
      { name: 'credit_card_statement.pdf', size: '1.8 MB', type: 'pdf' }
    ],
    messages: []
  },
  {
    id: 'RC-2023-003',
    title: 'Account Access Issue',
    status: 'Resolved',
    date: '2023-07-28',
    lastUpdated: '2 weeks ago',
    description: 'Unable to access online banking account.',
    files: [],
    messages: []
  }
];

export default function CasesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'resolved'>('active');
  
  const filteredCases = cases.filter(caseItem => {
    if (activeTab === 'active') return caseItem.status !== 'Resolved';
    if (activeTab === 'resolved') return caseItem.status === 'Resolved';
    return true;
  });

  const toggleCase = (caseId: string) => {
    setExpandedCase(expandedCase === caseId ? null : caseId);
  };

  const getStatusBadge = (status: string) => {
    const baseStyles = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'In Progress':
        return (
          <span className={`${baseStyles} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
            <Clock className="inline w-3 h-3 mr-1" />
            {status}
          </span>
        );
      case 'Pending':
        return (
          <span className={`${baseStyles} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>
            <AlertCircle className="inline w-3 h-3 mr-1" />
            {status}
          </span>
        );
      case 'Resolved':
        return (
          <span className={`${baseStyles} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`}>
            <CheckCircle className="inline w-3 h-3 mr-1" />
            {status}
          </span>
        );
      default:
        return <span className={baseStyles}>{status}</span>;
    }
  };

  const handleNewCase = () => {
    // TODO: Implement new case creation logic
    console.log('Create new case clicked');
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414]">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-200 pt-5">
          <main className="flex-1 overflow-y-auto p-4 sm:px-6 sm:py-4">
            <div className={`mx-auto transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Cases</h1>
                <button 
                  onClick={handleNewCase}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  New Case
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-[#333] mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' 
                      ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                  >
                    All Cases
                  </button>
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'active' 
                      ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                  >
                    Active Cases
                  </button>
                  <button
                    onClick={() => setActiveTab('resolved')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'resolved' 
                      ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                  >
                    Resolved Cases
                  </button>
                </nav>
              </div>

              {/* Cases List */}
              <div className="space-y-4">
                {filteredCases.length > 0 ? (
                  filteredCases.map((caseItem) => (
                    <div key={caseItem.id} className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                      <button
                        onClick={() => toggleCase(caseItem.id)}
                        className="w-full px-6 py-4 text-left focus:outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                              <FileText className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium text-gray-900 dark:text-white">{caseItem.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Case ID: {caseItem.id} • Opened: {caseItem.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="mb-1">{getStatusBadge(caseItem.status)}</div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Updated {caseItem.lastUpdated}
                              </p>
                            </div>
                            {expandedCase === caseItem.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Expanded Case Details */}
                      {expandedCase === caseItem.id && (
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-[#333] animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Case Details */}
                            <div className="md:col-span-2 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                                <p className="text-gray-700 dark:text-gray-300">{caseItem.description}</p>
                              </div>

                              {/* Messages */}
                              {caseItem.messages.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Messages</h4>
                                  <div className="space-y-4">
                                    {caseItem.messages.map((msg) => (
                                      <div key={msg.id} className="p-3 bg-gray-50 dark:bg-[#252525] rounded-lg">
                                        <div className="flex justify-between items-start">
                                          <span className="font-medium text-gray-900 dark:text-white">{msg.sender}</span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{msg.content}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* New Message */}
                              <div className="mt-4">
                                <label htmlFor={`message-${caseItem.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Send a message
                                </label>
                                <div className="flex space-x-2">
                                  <input
                                    type="text"
                                    id={`message-${caseItem.id}`}
                                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-[#252525] dark:border-[#333] dark:text-white"
                                    placeholder="Type your message..."
                                  />
                                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Send
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Files & Actions */}
                            <div className="space-y-4">
                              {/* Files */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Attached Files</h4>
                                {caseItem.files.length > 0 ? (
                                  <ul className="space-y-2">
                                    {caseItem.files.map((file, index) => (
                                      <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#252525] rounded-lg">
                                        <div className="flex items-center">
                                          <File className="w-4 h-4 text-gray-400 mr-2" />
                                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                                            {file.name}
                                          </span>
                                          <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                                        </div>
                                        <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                          <Download className="w-4 h-4" />
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">No files attached</p>
                                )}
                                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                                  <PlusCircle className="w-4 h-4 mr-1" />
                                  Add file
                                </button>
                              </div>

                              {/* Actions */}
                              <div className="pt-4 border-t border-gray-200 dark:border-[#333]">
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Actions</h4>
                                <div className="space-y-2">
                                  {caseItem.status === 'Resolved' ? (
                                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 dark:bg-[#252525] dark:border-[#333] dark:text-gray-300 dark:hover:bg-[#2d2d2d]">
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Reopen Case
                                    </button>
                                  ) : (
                                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 dark:bg-[#252525] dark:border-[#333] dark:text-gray-300 dark:hover:bg-[#2d2d2d]">
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Send Message
                                    </button>
                                  )}
                                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 dark:bg-[#252525] dark:border-[#333] dark:text-gray-300 dark:hover:bg-[#2d2d2d]">
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Case Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No {activeTab === 'all' ? '' : activeTab} cases</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {activeTab === 'all' 
                        ? 'You don\'t have any cases yet.' 
                        : `You don't have any ${activeTab} cases.`}
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                        New Case
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
