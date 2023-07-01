import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    preact({
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx-source'],
      },
    }),
    vitePluginFaviconsInject('src/assets/images/logo-light.svg'),
    tsconfigPaths(),
  ],
  assetsInclude: ['**/*.md'],
  server: {
    port: 3000,
    strictPort: true,
  },
})
