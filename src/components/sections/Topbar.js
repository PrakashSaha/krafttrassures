export default function Topbar() {
  return (
    <div className="relative z-[60]">
      <div className="hidden w-full border-b border-white/10 bg-black py-3 text-white lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-12 px-12">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5AB7D]"></span>
            <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-white/90 uppercase">
              All India fast delivery
            </span>
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5AB7D]"></span>
            <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-white/90 uppercase">
              Easy returns and refunds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
