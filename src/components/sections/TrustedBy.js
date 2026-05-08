export default function TrustedBy() {
  return (
    <section className="bg-[#FFF4B3] px-6 py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center text-center">
        <h2 className="mb-6 font-serif text-3xl text-black md:text-4xl lg:text-5xl">
          Trusted by Customers
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 font-sans text-base tracking-widest text-balance text-black uppercase md:gap-4 md:text-lg lg:text-xl">
          <div className="flex items-center gap-3 md:gap-4">
            <span>Promote Craft</span>
            <span className="block h-1.5 w-1.5 rounded-full bg-black"></span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <span>Support the artisan</span>
            <span className="block h-1.5 w-1.5 rounded-full bg-black"></span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <span>Preserve a Heritage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
