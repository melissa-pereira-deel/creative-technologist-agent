import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://creative-technologist.xyz', // update with real domain
  compressHTML: true,
  build: {
    assets: 'assets',
  },
});
