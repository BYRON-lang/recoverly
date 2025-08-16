'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, ShieldCheck, FileText, Image as ImageIcon, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  fileInfo?: {
    name: string;
    size: string;
    url?: string;
  };
}

export default function ExpertChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEncrypted] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample expert data
  const expert = {
    name: 'Alex Johnson',
    role: 'Recovery Specialist',
    avatar: '/expert-avatar.png',
  };

  // Scripted conversation flow
  const scriptedConversation: Array<{
    sender: 'user' | 'expert';
    content: string;
    type?: 'text' | 'file' | 'image';
    fileInfo?: { name: string; size: string; url?: string };
  }> = [
    { sender: 'user', content: "Hi Alex, my Instagram account was hacked this morning and I can't log in anymore.", type: 'text' },
    { sender: 'expert', content: "Thank you for your message. Don't worry, I'll guide you through recovering your account safely.", type: 'text' },
    { sender: 'user', content: "Okay, what's the first step?", type: 'text' },
    { sender: 'expert', content: "First, I need to confirm your recovery email or phone number linked to your Instagram. Can you provide that?", type: 'text' },
    { sender: 'user', content: "Here's a screenshot of the login issue.", type: 'image', fileInfo: { name: 'screenshot.png', size: '0.4 MB', url: '/screenshot.png' } },
    { sender: 'expert', content: "Got it. Thanks for the screenshot. Please reset your password using this secure link: [Instagram Recovery Form]", type: 'text' },
    { sender: 'user', content: "Done. I've updated my password.", type: 'text' },
    { sender: 'expert', content: "Great work. I recommend enabling two-factor authentication next to secure your account. I'll send you instructions.", type: 'text' }
  ];

  // Auto-play scripted conversation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < scriptedConversation.length) {
        const step = scriptedConversation[i];
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: step.sender,
          content: step.content,
          timestamp: new Date(),
          type: step.type || 'text',
          fileInfo: step.fileInfo,
        };
        setMessages(prev => [...prev, newMessage]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2000); // 2s delay between messages

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-[#333] bg-white dark:bg-[#252525] flex items-center flex-shrink-0 justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            {expert.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900 dark:text-white mr-1">{expert.name}</h3>
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{expert.role}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-1 ${isEncrypted ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {isEncrypted ? 'End-to-end encrypted' : 'Not encrypted'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
          <span>Secure Connection</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Start a conversation</h3>
              <p className="max-w-xs">Ask your expert about your case or share files for review.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-[#252525] text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.type === 'file' || msg.type === 'image' ? (
                    <div className="flex items-center space-x-2">
                      {msg.type === 'image' ? (
                        <ImageIcon className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 flex-shrink-0" />
                      )}
                      <div className="truncate">
                        <div className="font-medium">{msg.fileInfo?.name}</div>
                        <div className="text-xs opacity-75">{msg.fileInfo?.size}</div>
                      </div>
                      {msg.fileInfo?.url && (
                        <a
                          href={msg.fileInfo?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm ml-2"
                        >
                          View
                        </a>
                      )}
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                  <div className="text-xs mt-1 opacity-75 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
