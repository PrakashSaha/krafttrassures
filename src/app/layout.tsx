import './tailwind.css';
import './globals.css';
import React from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={playfair.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
