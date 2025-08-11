import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Target ES2015 for better compatibility
    target: 'es2015',
    // Generate legacy bundles
    rollupOptions: {
      output: {
        // Force .js extension for all JavaScript files
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Ensure proper module format
        format: 'es',
        // Add explicit exports
        exports: 'named'
      }
    },
    // Disable asset inlining to avoid MIME issues
    assetsInlineLimit: 0,
    // Enable source maps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'esbuild',
    // Ensure proper chunk size
    chunkSizeWarningLimit: 1000
  },
  // Base URL configuration for Netlify
  base: './',
  // Server configuration for development
  server: {
    port: 5173,
    host: true,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  },
  // Preview server configuration
  preview: {
    port: 4173,
    host: true
  }
});
