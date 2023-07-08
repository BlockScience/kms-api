import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    preact(),
    vitePluginFaviconsInject('src/assets/images/bsci_glyph_light.svg'),
    tsconfigPaths(),
    visualizer({
      template: 'treemap', // treemap/sunburst/network
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/build-analysis.html',
    }),
  ],
  assetsInclude: ['**/*.md'],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"')) {
          return
        }
        warn(warning)
      },
    },
  },
})
