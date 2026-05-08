export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-[#F9F2EA] px-6 py-[80px] lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute top-[-10%] left-[-5%] aspect-square w-1/3 rotate-[-12deg]">
          <img
            alt="Arunachal Mask Background"
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="object-contain"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: '0px',
              color: 'transparent',
            }}
            sizes="33vw"
            src="/images/img_8dfabc30d59d4b172f1aec28f3d60aba.png"
          />
        </div>
        <div className="absolute right-[-5%] bottom-[-10%] aspect-square w-1/3 rotate-[12deg]">
          <img
            alt="Arunachal Artifacts Background"
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="object-contain"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: '0px',
              color: 'transparent',
            }}
            sizes="33vw"
            src="/images/img_93892b41c09914ab339b71a95c773150.png"
          />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2
          className="mb-8 translate-y-0 font-serif text-[28px] leading-tight text-black opacity-100 transition-all duration-1000 sm:text-[34px] md:text-[38px] lg:text-[44px] xl:text-5xl"
          style={{ transitionDelay: '0.2s' }}
        >
          Authentic Arunachal Pradesh Artifacts - <br className="hidden lg:block" />
          Handmade Heritage for Modern Homes{' '}
        </h2>
        <div className="translate-y-0 font-sans text-[12px] leading-relaxed text-black/80 opacity-100 transition-all duration-1000 sm:text-[14px] lg:text-[16px]">
          <p className="mb-0 mb-4 font-sans text-[12px] leading-relaxed text-black/80 last:mb-0 sm:text-[14px] lg:text-[16px]">
            Arunachal Pradesh is known for its rich tribal craftsmanship where every artifact
            carries a cultural story, shaped by the hills, forests, and community traditions. From
            bamboo and cane utility artifacts to handloom textiles, bead jewellery, and
            ritual-inspired masks, these products are created using time-tested techniques passed
            across generations. At Kraft Treasure, we bring these genuine Arunachal artifacts online
            directly sourced from artisan communities, so you can own handmade décor and lifestyle
            pieces that feel rooted, sustainable, and truly original.
          </p>
        </div>
      </div>
    </section>
  );
}
