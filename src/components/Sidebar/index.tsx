'use client';

import { useState } from 'react';
import {
  Activity as ActivityIcon,
  Folder as FolderIcon,
  MessageSquare as MessageIcon,
  Book as BookIcon,
  Bell as BellIcon, 
  HelpCircle as HelpCircleIcon,
  FileText as FileIcon,
  PanelRight as PanelRightIcon,
  Shield as ShieldIcon,
  Key as KeyIcon,
  Link2 as LinkIcon,
  Lock as LockIcon,
  Wrench as WrenchIcon,
  ShieldCheck as ShieldCheckIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  onToggleCollapse: (isCollapsed: boolean) => void;
  activeTab?: 'dashboard' | 'cases' | 'chat' | 'knowledge' | 'notifications' | 'settings' | 'support';
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ActivityIcon, current: false },
  { name: 'My Cases', href: '/dashboard/cases', icon: FolderIcon, current: false },
  { name: 'Expert Chat', href: '/dashboard/chat', icon: MessageIcon, current: false },
  { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: BookIcon, current: false },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon, current: false },
];

export function Sidebar({ onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Update navigation items with current state based on pathname
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: (pathname.startsWith(item.href) && item.href !== '/dashboard') || pathname === item.href
  }));

  // Remove the duplicate activeTab declaration

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggleCollapse(newState);
  };

  const { logout } = useAuth();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  };

  return (
    <div className={`hidden md:flex md:flex-shrink-0 ${isCollapsed ? 'w-14' : 'w-56'}`}>
      <div className="flex flex-col w-full h-full border-r border-gray-200 dark:border-[#242424] bg-white dark:bg-[#141414] py-2 justify-between">
        {/* Logo Section */}
        <div className="w-full px-3">
          <div className="flex items-center h-12">
            <img className="h-7 w-auto" src="/logo.png" alt="Recoverly" />
            {!isCollapsed && (
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                Recoverly
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-[#242424] my-1"></div>

        {/* Navigation Menu */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1 px-1.5 space-y-1">
            {updatedNavigation.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`group flex items-center px-2 py-1.5 text-sm font-medium rounded-md ${
                  pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1e1e1e]'
                }`}
              >
                <item.icon 
                  className={`${isCollapsed ? 'mx-auto size-5' : 'mr-3 size-5'} ${
                    pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'
                  }`} 
                />
                {!isCollapsed && item.name}
              </Link>
            ))}
            
            {/* Tools & Security Section */}
            <div className="px-1.5 py-2 border-t border-gray-200 dark:border-[#242424]">
              <h3 className={`px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${isCollapsed ? 'hidden' : 'block'}`}>
                Tools & Security
              </h3>
              <div className="mt-2 space-y-0.5">
                <Link href="/dashboard/tools/breach-scanner" className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md ${
                  pathname?.startsWith('/dashboard/tools/breach-scanner')
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}>
                  <ShieldIcon className={`${isCollapsed ? 'mx-auto' : 'mr-3'} w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300`} />
                  {!isCollapsed && 'Data Breach Scanner'}
                </Link>
                <Link href="/dashboard/tools/password-generator" className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md ${
                  pathname?.startsWith('/dashboard/tools/password-generator')
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}>
                  <KeyIcon className={`${isCollapsed ? 'mx-auto' : 'mr-3'} w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300`} />
                  {!isCollapsed && 'Password Generator'}
                </Link>
                <Link href="/dashboard/tools/phishing-checker" className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md ${
                  pathname?.startsWith('/dashboard/tools/phishing-checker')
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}>
                  <LinkIcon className={`${isCollapsed ? 'mx-auto' : 'mr-3'} w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300`} />
                  {!isCollapsed && 'Phishing Link Checker'}
                </Link>
                <Link href="/dashboard/tools/two-fa-setup" className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md ${
                  pathname?.startsWith('/dashboard/tools/two-fa-setup')
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}>
                  <LockIcon className={`${isCollapsed ? 'mx-auto' : 'mr-3'} w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300`} />
                  {!isCollapsed && '2FA Setup Wizard'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Docs Section */}
        <div className="border-t border-gray-200 dark:border-[#242424] px-2 py-2">
          <div className="space-y-0.5">
            <Link href="/dashboard/support" className={`group flex items-center px-2 py-1.5 text-sm font-medium rounded-md ${pathname === '/dashboard/support' 
              ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1e1e1e]'}`}>
              <HelpCircleIcon className={`${isCollapsed ? 'mx-auto size-5' : 'mr-3 size-5'} ${pathname === '/dashboard/support' 
                ? 'text-orange-600 dark:text-orange-400' 
                : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'}`} />
              {!isCollapsed && 'Support'}
            </Link>
            <Link href="/dashboard/documentation" className={`group flex items-center px-2 py-1.5 text-sm font-medium rounded-md ${pathname === '/dashboard/documentation' 
              ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1e1e1e]'}`}>
              <FileIcon className={`${isCollapsed ? 'mx-auto size-5' : 'mr-3 size-5'} ${pathname === '/dashboard/documentation' 
                ? 'text-orange-600 dark:text-orange-400' 
                : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'}`} />
              {!isCollapsed && 'Documentation'}
            </Link>
          </div>
        </div>

        {/* Profile Section */}
        <Link 
          href="/dashboard/settings" 
          className="block border-t border-gray-200 dark:border-[#242424] hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors"
          title={isCollapsed ? 'Profile & Settings' : ''}
        >
          <div className={isCollapsed ? 'p-2' : 'px-3 py-2'}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-1.5 w-1.5 rounded-full ${isCollapsed ? 'mx-auto' : 'mr-3'} ${pathname.startsWith('/dashboard/notifications') ? 'bg-orange-600' : 'bg-transparent'}`} />
                <div className={`${isCollapsed ? 'h-8 w-8' : 'h-8 w-8'} rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
                </div>
                {!isCollapsed && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-300">John Doe</p>
                    <div className="flex items-center">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">View profile</p>
                      <svg className="ml-1 w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <button 
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  title="Sign out"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </Link>

        {/* Collapse Button */}
        <div className="w-full px-2 py-1.5 border-t border-gray-200 dark:border-[#242424]">
          <div className="flex items-center justify-between bg-white dark:bg-[#141414] rounded-lg p-1.5 border border-gray-200 dark:border-[#242424]">
            {!isCollapsed && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Collapse
              </span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <PanelRightIcon className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
