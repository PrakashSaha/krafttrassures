import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dlvanktuohroejmhytng.storage.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'dlvanktuohroejmhytng.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Silence Turbopack workspace warning
  // Note: turbo configuration is handled differently in newer Next.js versions

};

export default withNextIntl(nextConfig);
