import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), vitePluginFaviconsInject('src/assets/logo-light.svg'), tsconfigPaths()],
  assetsInclude: ['**/*.md'],
})
