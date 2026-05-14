import React from 'react';

const FEATURES = [
  {
    title: 'Authentic Handicraft Products',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>
    ),
  },
  {
    title: 'Secure Shopping',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
    ),
  },
  {
    title: 'Sustainable & Responsible',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="border-y border-black/5 bg-white py-14">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-12 px-6 md:flex-row md:gap-0 lg:px-12">
        {FEATURES.map((feature, index) => (
          <React.Fragment key={feature.title}>
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="mb-5 text-[#C5AB7D] transition-transform duration-500 hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="font-sans text-[10px] font-bold tracking-[0.25em] text-black uppercase">
                {feature.title}
              </h3>
            </div>
            {index < FEATURES.length - 1 && (
              <div className="hidden h-12 w-px bg-black/5 md:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
