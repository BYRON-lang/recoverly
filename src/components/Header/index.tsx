"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-2 pb-2 transition-all duration-300 bg-gray-50 dark:bg-[#141414]">
      <div className="relative w-full max-w-[2000px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center p-3">
          {/* Logo */}
          <a href="/" className="flex items-center z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Recoverly Logo" 
                  className="h-8 w-auto"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-3xl font-bold hidden sm:block" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Recoverly</span>
            </div>
          </a>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center bg-white dark:bg-[#1f1f1f] rounded-2xl h-15 px-3 border border-gray-100 dark:border-[#242424]">
              <div className="flex items-center text-lg font-bold text-gray-600 dark:text-gray-300 space-x-1">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors px-3 py-2 whitespace-nowrap">Enterprises</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors px-3 py-2 whitespace-nowrap">Products</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors px-3 py-2 whitespace-nowrap">Pricing</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors px-3 py-2 whitespace-nowrap">Blogs</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors px-3 py-2 whitespace-nowrap">Resources</a>
              </div>
            </nav>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-bold z-10 text-sm">
              Log in
            </Link>
            <Link href="/signup" className="text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors font-bold z-10 text-sm px-4 py-2 rounded-full flex items-center gap-2 border-2 border-orange-500 dark:border-orange-400 hover:border-orange-600 dark:hover:border-orange-300">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-3 bg-white dark:bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-[#242424]`}>
          <div className="px-2 pt-2 pb-4 space-y-1">
            <a href="#" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg mx-2 my-1">Enterprises</a>
            <a href="#" className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg mx-2 my-1">Products</a>
            <a href="#" className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg mx-2 my-1">Pricing</a>
            <a href="#" className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg mx-2 my-1">Blogs</a>
            <a href="#" className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg mx-2 my-1">Resources</a>
            <div className="pt-2">
              <Link href="/login" className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg mx-2 my-1">
                Log in
              </Link>
              <Link href="/signup" className="mt-2 block w-full text-center px-4 py-3 rounded-xl text-base font-medium text-orange-500 dark:text-orange-400 bg-transparent border-2 border-orange-500 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors mx-2 my-1">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
