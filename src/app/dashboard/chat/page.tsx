'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import ExpertChat from '@/components/ExpertChat';

export default function ChatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414] overflow-hidden">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="chat" />
        <div className="flex-1 flex flex-col h-full transition-all duration-200 pt-5">
          <main className="flex-1 flex flex-col h-[calc(100vh-5rem)]">
            <div className={`mx-auto w-full h-full flex flex-col transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Chat with Expert</h1>
                <p className="text-gray-500 dark:text-gray-400">Secure real-time chat with your assigned recovery specialist</p>
              </div>
              
              <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                <ExpertChat />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
