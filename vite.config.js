import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const SUPABASE_URL = 'https://xrotaqrhopmvdzvwzzua.supabase.co';

// GitHub Pages can't send security headers, so the production build carries
// them as meta tags. Skipped in dev, where Vite injects inline scripts.
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${SUPABASE_URL}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

function securityMeta() {
  return {
    name: 'security-meta',
    apply: 'build',
    transformIndexHtml() {
      return [
        { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: csp }, injectTo: 'head-prepend' },
        { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head-prepend' },
      ];
    },
  };
}

// Relative base so the build works at anasadda.github.io/Anas_Eddanfor/ or any other path.
export default defineConfig({
  plugins: [react(), securityMeta()],
  base: './',
});
