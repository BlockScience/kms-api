import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import tsconfigPaths from 'vite-tsconfig-paths'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [
    preact({
      babel: {
        // presets: [...],
        plugins: ['@babel/plugin-transform-react-jsx-source'],
      },
    }),
    vitePluginFaviconsInject('src/assets/images/logo-light.svg'),
    tsconfigPaths(),
    mkcert(),
  ],
  assetsInclude: ['**/*.md'],
  server: {
    https: true,
    port: 3000,
    strictPort: true,
    hmr: {
      host: 'localhost',
      clientPort: 3000,
    },
  },
})
