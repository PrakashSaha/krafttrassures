import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es', 'fr', 'de', 'ar'];

export default getRequestConfig(async () => {
  return {
    locale: 'en',
    messages: (await import(`../../messages/en.json`)).default
  };
});
