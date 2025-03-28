import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: "v8",  // Try "c8" if "v8" causes issues
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
    setupFiles: './src/test/setupTests.js', // Ensure this file exists
  },
});
