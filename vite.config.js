import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testing/setup.js',
    include: ['src/**/*.{spec,test}.js'],
  },
  plugins: [
    eslint(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Support legacy browsers
    }),
  ],
  build: {
    outDir: 'dist/browser',
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
      parse: {
        html5_comments: false,
      },
      sourceMap: false,
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
