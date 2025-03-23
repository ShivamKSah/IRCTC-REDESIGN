import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or vue

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures client-side routing works
  }
});
