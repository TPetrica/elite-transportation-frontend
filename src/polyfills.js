// Define global for Draft.js compatibility with Vite
window.global = window;
window.process = window.process || { env: { NODE_ENV: 'production' } };
