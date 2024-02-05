import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import globalConfig from './src/config.js'
const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/assets/images/icons')],
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      // 这里配置全局样式
      scss: {
        additionalData: `
          @use "@/styles/element_var.scss" as *;
          @import "@/styles/variable.scss";
          @import "@/styles/mixin.scss";
        `
      }
    }
  },
  server: {
    proxy: {
      [globalConfig.baseUrl]: {
        target: globalConfig.proxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(RegExp(`^${globalConfig.baseUrl}`), '')
      }
    }
  }
})
