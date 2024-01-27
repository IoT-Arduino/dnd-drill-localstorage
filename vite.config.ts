import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // distフォルダに出力
    outDir: resolve(__dirname, 'dist'),
    // 存在しないときはフォルダを作成する
    emptyOutDir: true,
    rollupOptions: {
      // entry pointがあるindex.htmlのパス
      input: {
        '': resolve(__dirname, './index.html'),
      },
    },
  },
});