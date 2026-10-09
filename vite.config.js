import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works at anasadda.github.io/Anas_Eddanfor/ or any other path.
export default defineConfig({
  plugins: [react()],
  base: './',
});
