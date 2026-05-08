import Link from 'next/link';

export default function ArtisanStories() {
  return (
    <section
      id="artisan-stories"
      className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-12 lg:px-12 lg:pt-10 lg:pb-16"
    >
      <div className="relative overflow-hidden bg-[#FFF4B3]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px] overflow-hidden opacity-100 transition-all duration-1000 lg:min-h-[550px]">
            <img
              alt="Made by Hands.<br />Carried by Heritage."
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: '0px',
                color: 'transparent',
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/img_8c34743a7b92154a6ceed277880a2e12.png"
            />
          </div>
          <div
            className="flex translate-y-0 flex-col justify-center p-8 opacity-100 transition-all duration-1000 lg:p-12 xl:p-16"
            style={{ transitionDelay: '0.3s' }}
          >
            <p className="text-primary mb-6 font-sans text-xs tracking-[0.4em] uppercase">
              Artisan Stories from Arunachal
            </p>
            <h2 className="mb-8 font-serif text-3xl leading-tight text-balance text-black md:text-4xl lg:text-5xl">
              <span>
                Made by Hands.
                <br />
                Carried by Heritage.
              </span>
            </h2>
            <div className="mb-8 max-w-xl font-sans text-sm leading-relaxed text-black/80 md:text-base">
              <p className="mb-0 mb-4 font-sans text-sm leading-relaxed text-black/80 last:mb-0 md:text-base">
                Behind every Kraft Treasure piece is an artisan family from Arunachal Pradesh,
                preserving ancestral skills in small village workshops. Your purchase directly
                supports local livelihoods and helps sustain the living heritage of our tribal
                communities in a modern world.
              </p>
            </div>
            <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-primary mb-4 font-serif text-4xl opacity-90 transition-all group-hover:scale-110 lg:text-5xl">
                  01
                </p>
                <h3 className="mb-2 font-sans text-sm font-semibold tracking-wide text-black uppercase">
                  Rooted in Community
                </h3>
                <p className="font-sans text-[13px] leading-relaxed text-black/70">
                  Techniques taught within families.
                </p>
              </div>
              <div>
                <p className="text-primary mb-4 font-serif text-4xl opacity-90 transition-all group-hover:scale-110 lg:text-5xl">
                  02
                </p>
                <h3 className="mb-2 font-sans text-sm font-semibold tracking-wide text-black uppercase">
                  Crafted in Small Batches
                </h3>
                <p className="font-sans text-[13px] leading-relaxed text-black/70">
                  Each piece is hand-made authenticity.
                </p>
              </div>
              <div>
                <p className="text-primary mb-4 font-serif text-4xl opacity-90 transition-all group-hover:scale-110 lg:text-5xl">
                  03
                </p>
                <h3 className="mb-2 font-sans text-sm font-semibold tracking-wide text-black uppercase">
                  Shipped with Pride
                </h3>
                <p className="font-sans text-[13px] leading-relaxed text-black/70">
                  Secure packaging for your craft.
                </p>
              </div>
            </div>
            <div className="flex">
              <Link
                className="group relative inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden bg-[#D33740] px-6 py-4 font-sans text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase shadow-md transition-colors duration-500"
                href="/our-story"
              >
                <span className="relative z-20">Collect The Pieces</span>
                <div className="absolute inset-0 z-10 -translate-x-[101%] bg-[#C5AB7D] transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
