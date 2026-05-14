import Image from 'next/image';

export default function Intro() {
  return (
    <section className="relative bg-[#F9F2EA] py-[80px] px-6 lg:px-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-5%] w-1/3 aspect-square rotate-[-12deg]">
          <Image 
            src="/images/img_8dfabc30d59d4b172f1aec28f3d60aba.png" 
            alt="Arunachal Mask Background" 
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-[-10%] right-[-5%] w-1/3 aspect-square rotate-[12deg]">
          <Image 
            src="/images/img_93892b41c09914ab339b71a95c773150.png" 
            alt="Arunachal Artifacts Background" 
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px] xl:text-5xl font-serif text-black leading-tight mb-8 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-4">
          Authentic Arunachal Pradesh Artifacts - <br className="hidden lg:block" /> 
          Handmade Heritage for Modern Homes
        </h2>
        <div className="text-[12px] sm:text-[14px] lg:text-[16px] text-black/80 font-sans leading-relaxed transition-all duration-1000 animate-in fade-in slide-in-from-bottom-4 delay-300">
          <p className="mb-4 last:mb-0">
            Arunachal Pradesh is known for its rich tribal craftsmanship where every artifact carries a cultural story, shaped by the hills, forests, and community traditions. From bamboo and cane utility artifacts to handloom textiles, bead jewellery, and ritual-inspired masks, these products are created using time-tested techniques passed across generations. At Kraft Treasure, we bring these genuine Arunachal artifacts online directly sourced from artisan communities, so you can own handmade décor and lifestyle pieces that feel rooted, sustainable, and truly original.
          </p>
        </div>
      </div>
    </section>
  );
}
