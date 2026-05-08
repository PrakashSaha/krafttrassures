import Link from 'next/link';

export default function Adornments() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-20 lg:px-12">
      <div className="grid min-h-[600px] grid-cols-1 gap-4 lg:h-[700px] lg:grid-cols-2 lg:gap-6">
        <div className="group relative h-[500px] translate-y-0 overflow-hidden opacity-100 transition-all duration-1000 lg:h-full">
          <img
            alt="Heritage Bead Necklaces"
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: '0px',
              color: 'transparent',
            }}
            sizes="100vw"
            src="/images/img_5b2209901953523b207d60b90672822f.png"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/100"></div>
          <div className="absolute right-8 bottom-8 left-8 z-20 text-white">
            <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-white/90 uppercase">
              Handcrafted Adornments
            </p>
            <h3 className="mb-4 font-serif text-3xl leading-tight md:text-4xl">
              Heritage Bead Necklaces
            </h3>
            <p className="mb-6 font-sans text-sm tracking-wide text-white/80">
              Starting from 5,400
            </p>
            <Link
              className="inline-flex items-center gap-2 border-b border-white/40 pb-1 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors hover:border-white"
              href="/shop"
            >
              Explore Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="group relative min-h-[300px] flex-1 translate-y-0 overflow-hidden opacity-100 transition-all delay-200 duration-1000">
            <img
              alt="Artisanal Bangles"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: '0px',
                color: 'transparent',
              }}
              sizes="100vw"
              src="/images/img_585ed4af2ec8b815204939c92c061c8a.png"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/100"></div>
            <div className="absolute right-8 bottom-10 left-8 z-20 text-white">
              <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-white/90 uppercase">
                Silver Artistry
              </p>
              <h3 className="mb-3 font-serif text-2xl md:text-3xl">Artisanal Bangles</h3>
              <p className="mb-6 font-sans text-sm tracking-wide text-white/80">
                Starting from 3,200
              </p>
              <Link
                className="inline-flex items-center gap-2 border-b border-white/40 pb-1 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors hover:border-white"
                href="/shop"
              >
                Explore Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="group relative min-h-[300px] flex-1 translate-y-0 overflow-hidden opacity-100 transition-all delay-400 duration-1000">
            <img
              alt="Gilded Vessels"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: '0px',
                color: 'transparent',
              }}
              sizes="100vw"
              src="/images/img_f08cce93af6994ee70cdee826c34c554.png"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/100"></div>
            <div className="absolute right-8 bottom-10 left-8 z-20 text-white">
              <p className="mb-3 font-sans text-[10px] tracking-[0.4em] text-white/90 uppercase">
                Liturgy &amp; Ritual
              </p>
              <h3 className="mb-3 font-serif text-2xl md:text-3xl">Gilded Vessels</h3>
              <p className="mb-6 font-sans text-sm tracking-wide text-white/80">
                Starting from 2,800
              </p>
              <Link
                className="inline-flex items-center gap-2 border-b border-white/40 pb-1 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors hover:border-white"
                href="/shop"
              >
                Explore Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
