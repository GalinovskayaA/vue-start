import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from 'url'

import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  base: '/vue-start/',
  plugins: [
    Vue(),

    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
      ],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})