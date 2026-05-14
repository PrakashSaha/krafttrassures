import React from 'react';
import Image from 'next/image';

interface InstagramPost {
  id: number | string;
  image: string;
  link: string;
}

export default function Instagram({ posts }: { posts?: InstagramPost[] }) {
  const displayPosts = posts && posts.length > 0 ? posts : [];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-12">
      {/* Header */}
      <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase md:text-xs">
          Behind the Scenes
        </p>
        <h2 className="mb-8 font-serif text-3xl text-black md:text-4xl lg:text-5xl">Shared on Instagram</h2>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary group"
        >
          View in Instagram
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {displayPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-zinc-100"
          >
            <Image
              src={post.image}
              alt={`Instagram post ${post.id}`}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex translate-y-full items-center justify-center bg-black/40 backdrop-blur-[2px] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white opacity-0 transition-opacity delay-200 duration-300 group-hover:opacity-100"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}
