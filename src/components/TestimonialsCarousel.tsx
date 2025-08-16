'use client';

import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialsCarousel() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah K.',
      role: 'Small Business Owner',
      content: 'After a devastating phishing attack, Recoverly helped me secure my business accounts and recover critical data within 24 hours.',
      rating: 5
    },
    {
      name: 'Michael T.',
      role: 'Freelance Designer',
      content: 'I lost access to my portfolio and client files. Thanks to Recoverly, I got everything back and learned how to better protect my work.',
      rating: 5
    },
    {
      name: 'Emily R.',
      role: 'College Student',
      content: 'When my social media was hacked, I felt violated. The team at Recoverly not only recovered my accounts but also guided me through securing my online presence.',
      rating: 5
    },
    {
      name: 'David M.',
      role: 'Entrepreneur',
      content: 'Quick response time and expert assistance. They helped me recover my business email after a sophisticated attack.',
      rating: 5
    },
    {
      name: 'Lisa P.',
      role: 'Teacher',
      content: 'I was scammed out of $2,000. Recoverly helped me secure my accounts and provided guidance on how to avoid future scams.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Success Stories</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Hear from people who've regained control of their digital lives</p>
      </div>

      <div className="relative">
        <div className="flex space-x-8 py-8 animate-[scroll_30s_linear_infinite] hover:animation-pause">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-80 p-6 bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Swipe or drag to see more stories</p>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 5))}
        }
        .animate-\[scroll_30s_linear_infinite\]:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
