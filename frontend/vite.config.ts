import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    preact({
      babel: {
        // presets: [...],
        // Your plugins run before any built-in transform (eg: Fast Refresh)
        plugins: ['@babel/plugin-transform-react-jsx-source'],
        // Use .babelrc files
        // babelrc: true,
        // Use babel.config.js files
        // configFile: true,
      },
    }),
    vitePluginFaviconsInject('src/assets/images/logo-light.svg'),
    tsconfigPaths(),
  ],
  assetsInclude: ['**/*.md'],
})
