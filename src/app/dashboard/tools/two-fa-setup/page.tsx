'use client';

import { useState, useRef, useEffect } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Lock, Check, Copy, RefreshCw, Smartphone, Mail, Key, ShieldCheck } from 'lucide-react';

export default function TwoFASetupPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'app' | 'sms' | 'email' | 'backup'>('app');
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  
  // Mock secret key for 2FA (in a real app, this would be generated server-side)
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const email = 'user@example.com'; // Would come from user's profile
  const phoneNumber = '+1 (555) 123-4567'; // Would come from user's profile

  // Format the secret key for display
  const formatSecretKey = (key: string) => {
    return key.match(/.{1,4}/g)?.join(' ') || '';
  };

  // Handle verification code input
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only allow numbers and limit to 1 character
    if (value === '' || /^\d$/.test(value)) {
      const newCode = verificationCode.split('');
      newCode[index] = value;
      setVerificationCode(newCode.join(''));
      
      // Move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      setVerificationCode(pastedData);
      // Focus the last input after paste
      inputRefs.current[5]?.focus();
    }
  };

  // Verify the code
  const verifyCode = () => {
    setIsSettingUp(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would verify the code with your backend
      const isValid = verificationCode.length === 6 && /^\d+$/.test(verificationCode);
      if (isValid) {
        setIsVerified(true);
        setStep(3); // Show success step
      }
      setIsSettingUp(false);
    }, 1000);
  };

  // Send verification code
  const sendVerificationCode = () => {
    setIsCodeSent(true);
    setTimeLeft(30);
    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Reset the form
  const resetForm = () => {
    setVerificationCode('');
    setIsVerified(false);
    setStep(1);
    setIsCodeSent(false);
    setTimeLeft(30);
  };

  // Set up the QR code
  useEffect(() => {
    // In a real app, you would generate a QR code here
    // For example, using a library like qrcode.react
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-[#141414] overflow-hidden">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} activeTab="dashboard" />
        <div className="flex-1 flex flex-col h-full transition-all duration-200 pt-5">
          <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
            <div className={`mx-auto w-full h-full transition-all duration-200 ${isSidebarCollapsed ? 'max-w-[95%]' : 'max-w-[85%]'}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Two-Factor Authentication</h1>
                <p className="text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                {/* Progress Steps */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex -mb-px">
                    <div className="w-1/4">
                      <div className={`py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center ${
                        step >= 1 
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          step >= 1 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                        </div>
                        <span>Choose Method</span>
                      </div>
                    </div>
                    <div className="w-1/4">
                      <div className={`py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center ${
                        step >= 2 
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          step >= 2 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                        </div>
                        <span>Verify</span>
                      </div>
                    </div>
                    <div className="w-1/4">
                      <div className={`py-4 px-1 text-center border-b-2 font-medium text-sm flex flex-col items-center ${
                        step >= 3 
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          step >= 3 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          3
                        </div>
                        <span>Complete</span>
                      </div>
                    </div>
                  </nav>
                </div>

                <div className="p-6">
                  {step === 1 && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Choose your 2FA method</h2>
                      
                      <div className="grid gap-4 mb-6">
                        <button
                          onClick={() => setActiveTab('app')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            activeTab === 'app'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`p-2 rounded-lg mr-4 ${
                              activeTab === 'app' 
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-800/30 dark:text-blue-400' 
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Authenticator App</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Use an app like Google Authenticator or Authy to generate verification codes.
                              </p>
                            </div>
                            {activeTab === 'app' && (
                              <div className="ml-auto">
                                <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                                </div>
                              </div>
                            )}
                          </div>
                        </button>

                        <button
                          onClick={() => setActiveTab('sms')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            activeTab === 'sms'
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 ring-1 ring-orange-500/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`p-2 rounded-lg mr-4 ${
                              activeTab === 'sms' 
                                ? 'bg-orange-100 text-orange-600 dark:bg-orange-800/30 dark:text-orange-400' 
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Text Message (SMS)</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Receive verification codes via text message at {phoneNumber}.
                              </p>
                            </div>
                            {activeTab === 'sms' && (
                              <div className="ml-auto">
                                <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                                </div>
                              </div>
                            )}
                          </div>
                        </button>

                        <button
                          onClick={() => setActiveTab('email')}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            activeTab === 'email'
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 ring-1 ring-orange-500/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`p-2 rounded-lg mr-4 ${
                              activeTab === 'email' 
                                ? 'bg-orange-100 text-orange-600 dark:bg-orange-800/30 dark:text-orange-400' 
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              <Mail className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Receive verification codes via email at {email}.
                              </p>
                            </div>
                            {activeTab === 'email' && (
                              <div className="ml-auto">
                                <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          onClick={() => setStep(2)}
                          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                        {activeTab === 'app' ? 'Set Up Authenticator App' : 
                         activeTab === 'sms' ? 'Verify Your Phone Number' : 
                         'Verify Your Email Address'}
                      </h2>
                      
                      {activeTab === 'app' ? (
                        <div className="max-w-md mx-auto">
                          <div className="text-center mb-6">
                            <div className="bg-white p-4 rounded-lg inline-block mb-4">
                              {/* Placeholder for QR code */}
                              <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                QR Code
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                              Scan this QR code with your authenticator app or enter the code manually:
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg inline-flex items-center">
                              <code className="font-mono text-sm">{formatSecretKey(secretKey)}</code>
                              <button 
                                onClick={() => navigator.clipboard.writeText(secretKey)}
                                className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                title="Copy to clipboard"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-8">
                            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Enter the 6-digit code from your authenticator app
                            </label>
                            <div className="flex space-x-2 justify-center">
                              {[...Array(6)].map((_, i) => (
                                <input
                                  key={i}
                                  ref={el => { inputRefs.current[i] = el; }}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={verificationCode[i] || ''}
                                  onChange={(e) => handleCodeChange(e, i)}
                                  onKeyDown={(e) => handleKeyDown(e, i)}
                                  onPaste={handlePaste}
                                  className="w-12 h-12 text-center text-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  autoFocus={i === 0}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-md mx-auto">
                          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <Key className="h-5 w-5 text-orange-400" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                  Verification code sent to {activeTab === 'sms' ? phoneNumber : email}
                                </h3>
                                <div className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                                  <p>Enter the 6-digit code we just sent you.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Verification Code
                            </label>
                            <div className="flex space-x-2">
                              {[...Array(6)].map((_, i) => (
                                <input
                                  key={i}
                                  ref={el => { inputRefs.current[i] = el; }}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  value={verificationCode[i] || ''}
                                  onChange={(e) => handleCodeChange(e, i)}
                                  onKeyDown={(e) => handleKeyDown(e, i)}
                                  onPaste={handlePaste}
                                  className="w-12 h-12 text-center text-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  autoFocus={i === 0}
                                />
                              ))}
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {isCodeSent && timeLeft > 0 
                                  ? `Resend code in ${timeLeft}s` 
                                  : "Didn't receive a code?"}
                              </span>
                              <button
                                type="button"
                                onClick={sendVerificationCode}
                                disabled={isCodeSent && timeLeft > 0}
                                className={`text-sm font-medium ${
                                  isCodeSent && timeLeft > 0
                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300'
                                }`}
                              >
                                {isCodeSent && timeLeft > 0 ? 'Resend' : 'Resend Code'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-8 flex justify-between">
                        <button
                          onClick={() => setStep(1)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Back
                        </button>
                        <button
                          onClick={verifyCode}
                          disabled={verificationCode.length !== 6 || isSettingUp}
                          className={`px-4 py-2 bg-orange-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                            verificationCode.length !== 6 || isSettingUp
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-orange-700'
                          }`}
                        >
                          {isSettingUp ? (
                            <span className="flex items-center">
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Verifying...
                            </span>
                          ) : 'Verify and Activate'}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="text-center py-8">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Two-Factor Authentication Enabled</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                        Your account is now protected with two-factor authentication. You'll need to enter a verification code each time you sign in.
                      </p>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto text-left mb-8">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                          <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                          Backup Codes
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          Save these one-time use backup codes in a safe place. You can use them to access your account if you lose access to your authenticator app.
                        </p>
                        <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                          {['A1B2C3', 'D4E5F6', 'G7H8I9', 'J0K1L2', 'M3N4O5', 'P6Q7R8', 'S9T0U1', 'V2W3X4'].map((code, i) => (
                            <div key={i} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-center">
                              {code}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                          <button className="text-sm text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 flex items-center">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Generate New Codes
                          </button>
                          <button className="text-sm text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 flex items-center">
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Codes
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            // In a real app, you would redirect to the dashboard or settings
                            resetForm();
                          }}
                          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Information Section */}
              <div className="mt-8 bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Two-Factor Authentication</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                      <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">Enhanced Security</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Adds an extra layer of security by requiring a second form of verification.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                      <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">Protect Your Account</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Helps prevent unauthorized access even if your password is compromised.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-[#252525] rounded-lg">
                      <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                        <Key className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">Multiple Methods</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose from authenticator apps, SMS, or email for verification.
                      </p>
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
