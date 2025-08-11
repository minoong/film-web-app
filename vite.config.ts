import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Miku Se-kai',
        short_name: '미쿠하게',
        description: '미쿠미쿠시떼아게루',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/favicon-196x196.png',
            sizes: '196x196',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-57x57.png',
            sizes: '57x57',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-60x60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-76x76.png',
            sizes: '76x76',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-114x114.png',
            sizes: '114x114',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-120x120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/mstile-70x70.png',
            sizes: '70x70',
            type: 'image/png',
          },
          {
            src: 'icons/mstile-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/mstile-150x150.png',
            sizes: '150x150',
            type: 'image/png',
          },
          {
            src: 'icons/mstile-310x150.png',
            sizes: '310x150',
            type: 'image/png',
          },
          {
            src: 'icons/mstile-310x310.png',
            sizes: '310x310',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
