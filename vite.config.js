import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    base: '/hello-vue/',
    plugins: [vue()]
})