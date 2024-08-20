import { defineConfig, configDefaults } from "vitest/config";
import react from '@vitejs/plugin-react';
import tsconfigPath from 'vite-tsconfig-paths';

export default defineConfig({
  plugins:[react(), tsconfigPath()],
  test: {
    environment: 'jsdom',
    environmentMatchGlobs:[
      ['**/api/**', "edge-runtime"],
    ],
    setupFiles: './src/vitestSetup.ts',
    // ...configDefaults,
    server: { deps: { inline: ["convex-test"] } },
  },
});

