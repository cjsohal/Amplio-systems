import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ampliosystemsltd.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@ds': fileURLToPath(new URL('./design-system', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
