import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/English_platform_for_lessons/',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/antd/') || id.includes('/@ant-design/')) return 'vendor-antd';
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router')
          ) {
            return 'vendor-react';
          }
          if (id.includes('/@reduxjs/') || id.includes('/react-redux/')) return 'vendor-redux';
          if (id.includes('/zod/')) return 'vendor-zod';
          return 'vendor';
        },
      },
    },
  },
  test: { environment: 'jsdom', setupFiles: ['./tests/setup.ts'], globals: true },
});
