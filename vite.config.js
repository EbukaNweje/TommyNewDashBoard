import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true,
    //   },
    //   manifest: {
    //     name: 'Swifteatrn Prime',
    //     short_name: 'Swifteatrn-Prime',
    //     description: 'Our platform is suitable for all traders, both beginners, and professionals. Triangular or triple arbitrage is the result of a price difference between the three currencies when exchange rates do not match. Such discrepancies are common in the cryptocurrency market. Using our software and powerful servers, we make arbitrage transactions within 1 exchange almost in real-time. We are committed to providing all our investors with exceptional service whileoffering our team the best training.',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: '/logo.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/logo.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         urlPattern: /^https:\/\/api\.example\.com\/.*$/, // Cache API requests
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'api-cache',
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
});
