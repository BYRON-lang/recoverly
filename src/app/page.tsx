import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import ClientFooter from '../components/ClientFooter';
import CompanyLogo from '../components/CompanyLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141414]">
      <Header />
      <main className="mx-8 md:mx-16 lg:mx-32 pt-24 pb-8">
        <section className="min-h-[60vh] flex flex-col items-center justify-start pt-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white max-w-4xl leading-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
          <div className="space-y-4">
            <div className="text-4xl md:text-5xl lg:text-6xl dark:text-white">Regain Control of Your Digital Life</div>
            <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-normal max-w-3xl mb-1">
              Connect with certified cybersecurity experts to recover hacked accounts, secure your digital identity, and protect your online presence 24/7
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4.5 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-[1.02] -mt-1">
              Start Free Trial
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4 inline-block ml-1.5 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <p className="mb-1">
                Want help? <a href="#" className="text-orange-500 hover:underline font-medium">Learn more</a>
              </p>
              <h1 className="text-lg text-gray-500 dark:text-gray-400">No credit card needed • 14-day free trial</h1>
            </div>
          </div>
          </h1>
        </section>

        {/* Video Demonstration */}
        <div className="w-full flex justify-center my-12 rounded-2xl bg-[#141414] py-12">
          <video 
            className="w-full max-w-[70vw] h-auto max-h-[70vh] rounded-xl shadow-2xl"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Recoverly Demonstration Video"
          >
            <source src="/recoverly.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Trust Indicators */}
        <section className="py-12 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-8">TRUSTED BY SECURITY TEAMS AT</p>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              {[
                { name: 'Microsoft', domain: 'microsoft.com' },
                { name: 'Google', domain: 'google.com' },
                { name: 'Slack', domain: 'slack.com' },
                { name: 'Airbnb', domain: 'airbnb.com' },
                { name: 'Uber', domain: 'uber.com' },
              ].map((company) => (
                <div key={company.name} className="col-span-1 flex justify-center">
                  <CompanyLogo 
                    name={company.name} 
                    domain={company.domain} 
                    size="lg"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2 dark:text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Rated 4.9/5 from 500+ security reviews</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Trusted by 10,000+ businesses worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Expert Help When You Need It Most</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">If you've been hacked, scammed, or compromised, our verified security experts are here to help you recover and secure your digital life</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* For Hacked Users */}
              <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">If You've Been Hacked</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Recover compromised accounts and devices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Remove malware and unauthorized access</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Secure your personal information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">24/7 emergency response team</span>
                  </li>
                </ul>
                <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Get Help Now
                </button>
              </div>

              {/* For Scam Victims */}
              <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">If You've Been Scammed</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Report and recover from financial scams</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Stop ongoing fraudulent activities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Secure your identity and accounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300">Expert guidance through recovery</span>
                  </li>
                </ul>
                <button className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Report a Scam
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Inter Tight, sans-serif' }}>How Our Recovery Process Works</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Simple steps to get you back in control of your digital life</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {[
              {
                number: 1,
                title: 'Initial Assessment',
                description: 'Complete a quick form about your situation and our experts will analyze your case.'
              },
              {
                number: 2,
                title: 'Personalized Plan',
                description: 'Receive a customized recovery plan with clear steps and timeline.'
              },
              {
                number: 3,
                title: 'Recovery & Support',
                description: 'Work with your expert to recover your accounts and implement security measures to prevent future issues.'
              }
            ].map((step, index) => (
              <div key={index} className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-[#242424] hover:border-gray-200 dark:hover:border-[#333333] transition-colors">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400 text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-xl transition-colors">
              Start Your Recovery Now
            </button>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* Get Started Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Column - Get Started */}
                <div className="p-8 md:p-10 bg-gradient-to-br from-orange-50 to-orange-100 dark:bg-gradient-to-br from-orange-600 to-orange-700">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 'bold' }}>Get Started Today</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Try our service risk-free with a 14-day trial period.</p>
                  
                  <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-sm mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1" style={{ fontFamily: 'Inter Tight, sans-serif' }}>14-Day Free Trial</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Full access to all features</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400">for 14 days</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Then $29.99/month after trial</p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                      Start Your Free Trial
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">No credit card required. Cancel anytime.</p>
                  </div>
                </div>

                {/* Right Column - Features */}
                <div className="p-8 md:p-10 bg-white dark:bg-[#1f1f1f]">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Everything You Need to Stay Secure</h3>
                  <ul className="space-y-4">
                    {[
                      {
                        title: '24/7 Priority Support',
                        description: 'Round-the-clock assistance from our security experts'
                      },
                      {
                        title: 'Full Account Recovery',
                        description: 'Comprehensive recovery of all your digital accounts'
                      },
                      {
                        title: 'Security Audit',
                        description: 'Detailed analysis of your current security status'
                      },
                      {
                        title: 'Prevention Training',
                        description: 'Learn how to protect yourself from future threats'
                      },
                      {
                        title: 'Data Protection',
                        description: 'Secure backup and recovery of your important files'
                      },
                      {
                        title: 'Identity Monitoring',
                        description: 'Continuous monitoring for potential identity theft'
                      }
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-100 p-1 rounded-full mr-4 mt-0.5">
                          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Inter Tight, sans-serif' }}>{feature.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-white dark:bg-[#141414]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Choose the plan that fits your needs. No hidden fees, cancel anytime.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Basic</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Essential protection for individuals</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">$9.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['✓ Account recovery assistance', '24/7 email support', 'Basic security audit', 'Monthly security reports', '1 device protection'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Get Started
                </button>
              </div>

              {/* Pro Plan - Featured */}
              <div className="relative bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-lg transform scale-105 z-10">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Pro</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Complete protection for individuals & families</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">$24.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['✓ Everything in Basic', 'Priority 24/7 support', 'Advanced security audit', 'Weekly security reports', 'Up to 5 devices', 'Family protection', 'Dark web monitoring'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Start Free Trial
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Custom solutions for businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['✓ Everything in Pro', 'Dedicated account manager', 'Custom security solutions', 'Team training', 'Unlimited devices', 'Advanced threat detection', 'Compliance reporting'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300">Need help choosing the right plan? <a href="#" className="text-orange-500 hover:underline font-medium">Contact our sales team</a></p>
            </div>
          </div>
        </section>

        {/* Gradient Pill Section */}
        <section className="relative -mx-32 pt-10 overflow-visible flex gap-2">
          {/* Colorful Gradient Pill */}
          <div className="w-[400px] h-30 rounded-r-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-90">
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm">
            </div>
          </div>
          
          {/* Questions Text with Contact Button */}
          <div className="w-[700px] h-30 relative flex items-center justify-between bg-gray-200 dark:bg-[#1f1f1f] rounded-full overflow-hidden">
            <p className="font-bold text-gray-800 dark:text-white text-4xl pl-8 pr-4 flex items-center gap-8" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Still have questions?
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 px-6 rounded-full flex items-center gap-2 transition-colors">
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </p>          </div>
            <section className="relative -mr-32 gap-2">
             <div className="w-[400px] h-30 rounded-l-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-90">
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm">
            </div>
          </div>
          </section>
        </section>
      </main>
      <ClientFooter />
    </div>
  );
}