'use client';

import { useState } from 'react';
import { User, Mail, Lock, Smartphone, Info, Check } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function ProfileSettingsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setIsEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414] overflow-hidden">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="settings" />
        <div className="flex-1 flex flex-col h-full transition-all duration-200 pt-5">
          <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
            <div className={`mx-auto w-full h-full transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Profile Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account information and security settings</p>
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-[#333]">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`py-4 px-6 text-sm font-medium ${
                        activeTab === 'profile'
                          ? 'border-b-2 border-orange-500 text-orange-600 dark:text-orange-400'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Profile Information
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`py-4 px-6 text-sm font-medium ${
                        activeTab === 'security'
                          ? 'border-b-2 border-orange-500 text-orange-600 dark:text-orange-400'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Security
                    </button>
                  </nav>
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Your profile has been updated successfully!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {activeTab === 'profile' ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center overflow-hidden">
                            <User className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="ml-6">
                            <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
                              onClick={() => document.getElementById('avatar-upload')?.click()}
                            >
                              Change
                            </button>
                            <input type="file" id="avatar-upload" className="hidden" accept="image/*" />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              JPG, GIF or PNG. Max size 2MB
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-[#252525] dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-[#252525] dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Smartphone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-[#252525] dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                          {!isEditing ? (
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-[#252525] hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                              Edit Profile
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEditing(false);
                                  // Reset form data if needed
                                }}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-[#252525] hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                              >
                                {isLoading ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                  </>
                                ) : 'Save Changes'}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Password
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="password"
                                  id="currentPassword"
                                  name="currentPassword"
                                  value={formData.currentPassword}
                                  onChange={handleChange}
                                  className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-[#252525] dark:text-white"
                                  placeholder="Enter current password"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                New Password
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="password"
                                  id="newPassword"
                                  name="newPassword"
                                  value={formData.newPassword}
                                  onChange={handleChange}
                                  className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-[#252525] dark:text-white"
                                  placeholder="Enter new password"
                                />
                              </div>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Must be at least 8 characters long
                              </p>
                            </div>

                            <div>
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm New Password
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-[#252525] dark:text-white"
                                  placeholder="Confirm new password"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                            className={`px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                              !formData.currentPassword || !formData.newPassword || !formData.confirmPassword
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-orange-700'
                            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isLoading ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </div>
                    </form>
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
