import { defineConfig, passthroughImageService } from 'astro/config';
import compressor from 'astro-compressor';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.deepbiodata.com',
  // Servidor propio en Linux: Astro sirve el sitio estático + el endpoint del
  // formulario (src/pages/api/contact.ts) con Node en modo standalone.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt'],
    routing: {
      // Los tres idiomas viven bajo prefijo propio (/en/, /es/, /pt/) para que
      // la estructura sea simetrica; la raiz redirige a /en/ (ver redirects).
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    '/': '/en/',
  },
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-ES', pt: 'pt-PT' },
      },
      // Las 404 localizadas no son contenido indexable.
      filter: (page) => !page.includes('404'),
    }),
    compressor(),
  ],
  image: {
    service: passthroughImageService(),
  },
});
