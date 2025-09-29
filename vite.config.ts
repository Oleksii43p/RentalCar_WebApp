// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  // 💡 Цей параметр КРИТИЧНО важливий для коректних шляхів до CSS/JS у збірці Vercel
  base: '/',
  build: {
    outDir: 'dist', // Забезпечуємо, що папка збірки dist
    sourcemap: true,
  },
});
