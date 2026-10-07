import { defineConfig } from 'vitest/config';

export default defineConfig({
  // JSXはtsconfigのreact-jsx設定で変換し、Vite 6のプラグインとの型衝突を避ける。
  test: {
    environment: 'jsdom',
    setupFiles: './src/testSetup.ts',
    restoreMocks: true,
  },
});
