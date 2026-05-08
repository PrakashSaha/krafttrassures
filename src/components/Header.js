import Link from 'next/link';
export default function Header() {
  return (
    <header className="sticky top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-500">
      <div className="relative mx-auto w-full max-w-[1440px]">
        <nav className="flex items-center justify-between px-6 py-3 lg:px-12 lg:py-4">
          <div className="flex items-center gap-6 xl:gap-12">
            <Link className="transition-opacity hover:opacity-80" href="/">
              <img
                alt="Kraft Treasure Logo"
                loading="lazy"
                width="220"
                height="80"
                decoding="async"
                data-nimg="1"
                className="h-11 w-auto object-contain lg:h-14"
                style={{ color: 'transparent' }}
                src="/images/img_a798301695a75446cda6944aecd9a0d9.jpeg"
              />
            </Link>
            <div className="hidden items-center gap-4 lg:flex xl:gap-8">
              <div className="relative py-4">
                <Link
                  className="flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-black uppercase transition-colors hover:text-[#E31E25]"
                  href="/"
                >
                  Home
                </Link>
              </div>
              <div className="group py-4">
                <Link
                  className="flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-black uppercase transition-colors hover:text-[#E31E25]"
                  href="/shop"
                >
                  Shop
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
                    className="lucide lucide-chevron-down ml-0.5 h-3.5 w-3.5 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className="invisible absolute top-full right-0 left-0 z-[45] w-full origin-top scale-y-95 overflow-hidden border-b border-gray-100 bg-white opacity-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:visible group-hover:scale-y-100 group-hover:opacity-100">
                  <div className="mx-auto max-w-[1440px] px-12 py-12">
                    <div className="grid grid-cols-6 gap-6">
                      <Link className="group/item flex flex-col" href="/shop">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                          <img
                            alt="Show Pieces"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: '0px',
                              color: 'transparent',
                            }}
                            sizes="(max-width: 1024px) 50vw, 16vw"
                            src="/images/img_f08cce93af6994ee70cdee826c34c554.png"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover/item:bg-black/0"></div>
                        </div>
                        <h4 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                          Show Pieces
                        </h4>
                        <div className="flex items-center gap-2 px-1 transition-colors group-hover/item:text-[#E31E25]">
                          <span className="text-[9px] font-medium tracking-[0.15em] text-black/60 uppercase group-hover/item:text-[#E31E25]">
                            Explore
                          </span>
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
                            className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover/item:translate-x-1"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                      <Link className="group/item flex flex-col" href="/shop">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                          <img
                            alt="Textile &amp; Weaving"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: '0px',
                              color: 'transparent',
                            }}
                            sizes="(max-width: 1024px) 50vw, 16vw"
                            src="/images/img_5272ad50803a3ab605149781d666fb4b.png"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover/item:bg-black/0"></div>
                        </div>
                        <h4 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                          Textile &amp; Weaving
                        </h4>
                        <div className="flex items-center gap-2 px-1 transition-colors group-hover/item:text-[#E31E25]">
                          <span className="text-[9px] font-medium tracking-[0.15em] text-black/60 uppercase group-hover/item:text-[#E31E25]">
                            Explore
                          </span>
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
                            className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover/item:translate-x-1"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                      <Link className="group/item flex flex-col" href="/shop">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                          <img
                            alt="Wall Decor &amp; Hanging"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: '0px',
                              color: 'transparent',
                            }}
                            sizes="(max-width: 1024px) 50vw, 16vw"
                            src="/images/img_24c6b995e700c5e6965658f7714891d6.png"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover/item:bg-black/0"></div>
                        </div>
                        <h4 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                          Wall Decor &amp; Hanging
                        </h4>
                        <div className="flex items-center gap-2 px-1 transition-colors group-hover/item:text-[#E31E25]">
                          <span className="text-[9px] font-medium tracking-[0.15em] text-black/60 uppercase group-hover/item:text-[#E31E25]">
                            Explore
                          </span>
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
                            className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover/item:translate-x-1"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                      <Link className="group/item flex flex-col" href="/shop">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                          <img
                            alt="Necklaces"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: '0px',
                              color: 'transparent',
                            }}
                            sizes="(max-width: 1024px) 50vw, 16vw"
                            src="/images/img_5b2209901953523b207d60b90672822f.jpeg"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover/item:bg-black/0"></div>
                        </div>
                        <h4 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                          Necklaces
                        </h4>
                        <div className="flex items-center gap-2 px-1 transition-colors group-hover/item:text-[#E31E25]">
                          <span className="text-[9px] font-medium tracking-[0.15em] text-black/60 uppercase group-hover/item:text-[#E31E25]">
                            Explore
                          </span>
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
                            className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover/item:translate-x-1"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                      <Link className="group/item flex flex-col" href="/shop">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                          <img
                            alt="others"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: '0px',
                              color: 'transparent',
                            }}
                            sizes="(max-width: 1024px) 50vw, 16vw"
                            src="/images/img_ea260192b5d5e7b46cb323470fd4fd8b.png"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover/item:bg-black/0"></div>
                        </div>
                        <h4 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                          others
                        </h4>
                        <div className="flex items-center gap-2 px-1 transition-colors group-hover/item:text-[#E31E25]">
                          <span className="text-[9px] font-medium tracking-[0.15em] text-black/60 uppercase group-hover/item:text-[#E31E25]">
                            Explore
                          </span>
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
                            className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover/item:translate-x-1"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                      <Link className="group/item flex flex-col" href="/shop">
                        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100">
                          <img
                            alt="Figurine &amp; Sculpture"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              inset: '0px',
                              color: 'transparent',
                            }}
                            sizes="(max-width: 1024px) 50vw, 16vw"
                            src="/images/img_80562aee7c8a6801b8187db048b6820e.png"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover/item:bg-black/0"></div>
                        </div>
                        <h4 className="mb-2 px-1 text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                          Figurine &amp; Sculpture
                        </h4>
                        <div className="flex items-center gap-2 px-1 transition-colors group-hover/item:text-[#E31E25]">
                          <span className="text-[9px] font-medium tracking-[0.15em] text-black/60 uppercase group-hover/item:text-[#E31E25]">
                            Explore
                          </span>
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
                            className="lucide lucide-arrow-right h-3 w-3 transition-transform group-hover/item:translate-x-1"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative py-4">
                <Link
                  className="flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-black uppercase transition-colors hover:text-[#E31E25]"
                  href="/our-story"
                >
                  Our Story
                </Link>
              </div>
              <div className="relative py-4">
                <Link
                  className="flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-black uppercase transition-colors hover:text-[#E31E25]"
                  href="/contact"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <button
              type="button"
              className="text-black transition-colors hover:text-[#E31E25]"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" className="" />
              </svg>
            </button>
            <Link
              className="text-black transition-colors hover:text-[#E31E25]"
              aria-label="Login"
              href="/login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link
              className="relative text-black transition-colors hover:text-[#E31E25]"
              aria-label="Wishlist with 0 items"
              href="/login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]"
                aria-hidden="true"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </Link>
            <button
              type="button"
              className="relative cursor-pointer text-black transition-colors hover:text-[#E31E25]"
              aria-label="Shopping bag with 0 items"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-bag h-[18px] w-[18px] lg:h-[22px] lg:w-[22px]"
                aria-hidden="true"
              >
                <path d="M16 10a4 4 0 0 1-8 0" />
                <path d="M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
              </svg>
            </button>
            <button
              type="button"
              className="text-black transition-colors hover:text-[#E31E25] lg:hidden"
              aria-label="Open menu"
            >
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
                className="lucide lucide-menu h-6 w-6"
                aria-hidden="true"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
