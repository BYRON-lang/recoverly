'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { PlusCircle, MessageSquare, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const activeCases = [
  { id: 1, title: 'Case #12345 - Unauthorized Transaction', status: 'In Progress', date: '2023-08-15' },
  { id: 2, title: 'Case #12344 - Account Access Issue', status: 'Under Review', date: '2023-08-14' },
];

const recentActivities = [
  { id: 1, type: 'update', description: 'Case #12345 status updated to In Progress', time: '2 hours ago' },
  { id: 2, type: 'message', description: 'New message from support team', time: '5 hours ago' },
  { id: 3, type: 'update', description: 'Document uploaded for Case #12344', time: '1 day ago' },
];

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const securityScore = 87; // Example security score out of 100

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414]">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="dashboard" />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-200 pt-5">
          <main className="flex-1 overflow-y-auto p-4 sm:px-6 sm:py-4">
            <div className={`mx-auto space-y-6 transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Activity Dashboard</h1>
              <p className="text-gray-500  dark:text-gray-400">List of all the activities</p>
              
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-4 bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                  <PlusCircle className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Report New Issue</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                  <MessageSquare className="w-5 h-5 text-green-500 mr-2" />
                  <span>Speak to an Expert</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Cases */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Active Cases</h2>
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                    {activeCases.length > 0 ? (
                      <ul className="divide-y divide-gray-200 dark:divide-[#333]">
                        {activeCases.map((item) => (
                          <li key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.status} • {item.date}
                                </p>
                              </div>
                              <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                View
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        No active cases
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Health Score */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Security Health</h2>
                  <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] p-6 text-center">
                    <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full border-8"
                      style={{
                        background: `conic-gradient(${
                          securityScore > 70 ? '#10B981' : securityScore > 40 ? '#F59E0B' : '#EF4444'
                        } ${securityScore * 3.6}deg, #E5E7EB 0deg)`
                      }}>
                      <div className="absolute flex flex-col items-center justify-center w-28 h-28 bg-white dark:bg-[#1e1e1e] rounded-full">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{securityScore}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">out of 100</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      {securityScore > 70 ? (
                        <span className="text-green-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 mr-1" /> Good
                        </span>
                      ) : (
                        <span className="text-yellow-500 flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 mr-1" /> Needs Attention
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
                <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                  {recentActivities.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-[#333]">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {activity.type === 'update' ? (
                                <Clock className="w-4 h-4 text-gray-400" />
                              ) : (
                                <MessageSquare className="w-4 h-4 text-blue-400" />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-900 dark:text-white">
                                {activity.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      No recent activity
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
