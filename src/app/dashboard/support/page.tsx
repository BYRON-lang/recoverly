'use client';

import { useState } from 'react';
import { HelpCircle, MessageSquare, Mail, Phone, Clock } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

export default function SupportPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Sidebar 
        onToggleCollapse={setIsSidebarCollapsed} 
        activeTab="support"
      />
      <div className={`flex-1 ${isSidebarCollapsed ? 'md:ml-14' : 'md:ml-56'} p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Center</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Support</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Chat Support</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Chat with our support team in real-time</p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Start Chat
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Email Us</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get a response within 24 hours</p>
                      <a href="mailto:support@recoverly.com" className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        support@recoverly.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Call Us</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Speak with our support team</p>
                      <a href="tel:+18005551234" className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        +1 (800) 555-1234
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Support Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                    <span className="font-medium text-gray-900 dark:text-white">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                    <span className="font-medium text-gray-900 dark:text-white">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span className="font-medium text-gray-900 dark:text-white">Closed</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Emergency Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    For critical issues outside business hours, please call our emergency line:
                  </p>
                  <a href="tel:+18005556789" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium">
                    +1 (800) 555-6789
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for our services.'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from the Billing section in your account settings.'
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.'
  },
  {
    question: 'How can I update my account information?',
    answer: 'You can update your account information, including your email and contact details, from the Profile section in your account settings.'
  }
];
