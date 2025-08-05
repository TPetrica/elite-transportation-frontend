/* eslint-disable no-undef */
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['@popperjs/core'],
      output: { globals: { '@popperjs/core': 'Popper' } },
    },
  },
  optimizeDeps: {
    include: ['@popperjs/core', 'draft-js', 'react-draft-wysiwyg'],
    esbuildOptions: { define: { global: 'globalThis' } },
  },
  define: { 'process.env': {}, global: 'window' },
})
