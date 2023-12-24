import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from "vite-plugin-pages";
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ command, mode }) => {
  require('dotenv').config({ path: `./viteEnvConfig/.env${mode === 'skin' ? '.skin' : ''}` });

  const { VITE_TEMPLATE, VITE_SITE_CODE, VITE_APP_CODE } = process.env;

  let url: string = VITE_SITE_CODE === 'dcs' ? 'https://download.99yipintao.com' : 'https://download.faststaticpro.com';


  const assetsPath = `${url}/${VITE_APP_CODE}/pc`;

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['src/api', 'src/stores'],
        dts: 'types/auto-imports.d.ts',
        eslintrc: {
          enabled: false,
          filepath: 'types/.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        resolvers: [ElementPlusResolver(), ArcoResolver()],
      }),
      Pages({
        importMode(filepath, options) {
          for (const page of options.dirs) {
            if (filepath.startsWith(`/${page.dir}/index`) || filepath.includes('micro_page')) return 'sync'
          }
          return 'async';
        },
        dirs: `./src/pages/${VITE_TEMPLATE}`,//指定生成路由的目录
        extensions: ["vue"],//文件后缀
        exclude: [
          `**/src/pages/${VITE_TEMPLATE}/*.ts`,
          `**/src/pages/${VITE_TEMPLATE}/*/component/**/*.vue`,
          `**/src/pages/${VITE_TEMPLATE}/*/css/*.scss`
        ],//可以排除指定目录
        extendRoute(route, parent) {
          // || route.path.includes('/micro_page')
          if (route.path.includes('/profile')) {
            return {
              ...route,
              meta: { auth: true, bg: 'bg_3' }
            }
          }
          return route;
        }
      }),
      Components({
        resolvers: [ElementPlusResolver(), ArcoResolver({
          sideEffect: true
        })],
      }),
      VitePluginHtmlEnv({
        compiler: true,
        prefix: '<{',
        suffix: '}>',
      })
    ],
    // base: '/',
    base: process.env.NODE_ENV === 'development' ? "/" : assetsPath,
    server: {
      port: 9093, hmr: true, host: true,
      // proxy: {
      //   '/api/game/': {
      //     target: 'https://ana.rrccedu.com',
      //     changeOrigin: true,
      //   },
      // },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "src"),
        'stores': path.resolve(__dirname, "src/stores"),
        'assets': path.resolve(__dirname, 'src/assets'),
        'components': path.resolve(__dirname, 'src/components'),
        'commonComponent': path.resolve(__dirname, `src/components/${VITE_TEMPLATE}`),
        'static_data': path.resolve(__dirname, `src/assets/data/${VITE_TEMPLATE}`),
        'utils': path.resolve(__dirname, 'src/utils'),
        "footer": path.resolve(__dirname, `src/components/${VITE_TEMPLATE}/Footer`),
        "pages": path.resolve(__dirname, `src/pages/${VITE_TEMPLATE}`),
        "header": path.resolve(__dirname, `src/components/${VITE_TEMPLATE}/Header`),
        "sideBar": path.resolve(__dirname, `src/components/${VITE_TEMPLATE}/SideBar`),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    envDir: "./viteEnvConfig",
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "./src/assets/style/mixin.scss"; @import "./src/assets/style/${VITE_TEMPLATE}/${VITE_THEME}.scss"; @import "./src/assets/style/${VITE_TEMPLATE}/${VITE_THEME}/reset_element.scss";`
          additionalData: `@use "./src/assets/style/mixin.scss" as *;`,
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: true,
      sourcemap: false,
      assetsInlineLimit: 4000,
      assetsDir: "static",
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/')
              switch (arr[0]) {
                case '@kangc':
                case '@naturefw':
                case '@popperjs':
                case '@vue':
                case 'axios':
                case 'pinia':
                case 'element-plus':
                  return '_' + arr[0]
                default:
                  return '__vendor'
              }
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/name-[hash].[ext]",
        },
      },
    }
  }
})
