import './tailwind.css';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
