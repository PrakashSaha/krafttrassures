import TranslateFix from '@/components/TranslateFix';
import './tailwind.css';
import './globals.css';
import React from 'react';
import { Inter, Playfair_Display, Noto_Sans_Arabic } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Metadata } from 'next';
import { getCategories } from '@/lib/strapi';
import { Toaster } from 'sonner';
import OnboardingModal from '@/components/OnboardingModal';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const arabicFont = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'Kraft Treasure | Authentic Tribal Handicrafts of Arunachal Pradesh',
  description:
    "Explore Kraft Treasure's curated archive of authentic Monpa pottery, sacred deity masks, and hand-painted tribal instruments. Preserving the heritage craftsmanship of Northeast India.",
  keywords:
    'Arunachal Pradesh handicrafts, tribal art, Monpa pottery, sacred masks, Indian heritage, handcrafted musical instruments',
  openGraph: {
    title: 'Kraft Treasure | Authentic Tribal Handicrafts',
    description: 'Curated heritage craftsmanship from the heart of Arunachal Pradesh.',
    url: 'https://krafttreasure.com',
    siteName: 'Kraft Treasure',
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale: string = 'en';
  const categories = await getCategories();
  const messages = await getMessages();

  const isRtl = locale === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';
  const bodyClass = isRtl ? arabicFont.className : playfair.className;

  return (
    <html lang={locale} dir={direction} className={`${inter.variable} ${playfair.variable} ${arabicFont.variable}`} data-scroll-behavior="smooth">
      <body className={bodyClass} suppressHydrationWarning>
        <TranslateFix />
        {/* Google Translate Hidden Widget */}
        <div id="google_translate_element" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, overflow: 'hidden' }}></div>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,es,fr,de,ar', autoDisplay: false}, 'google_translate_element');
            }
          `
        }}></script>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster position="bottom-right" richColors />
          <AuthProvider>
            <CartProvider>
              <Header initialCategories={categories} />
              <OnboardingModal />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
