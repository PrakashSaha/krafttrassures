import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Topbar from '@/components/sections/Topbar';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
      <Topbar />
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center">
          <p className="mb-6 font-sans text-[10px] tracking-[0.4em] text-[#C5AB7D] uppercase">
            404 Error
          </p>
          <h1 className="mb-8 font-serif text-5xl text-black lg:text-7xl">Lost in the Archive</h1>
          <p className="mb-12 font-sans text-sm leading-relaxed text-black/60">
            The heritage piece or collection you are looking for does not exist in our current
            digital archive. It may have been relocated or removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-4 bg-[#D33740] px-12 py-5 font-sans text-[10px] tracking-[0.3em] text-white uppercase shadow-lg shadow-[#D33740]/10 transition-all duration-500 hover:bg-black"
          >
            Return to Homepage <span>→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
