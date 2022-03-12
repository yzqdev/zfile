
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import * as path from "path";
const resolve = path.resolve;
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
export default defineConfig({
  plugins: [vue() ,createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',

    /**
     * 自定义插入位置
     * @default: body-last
     */
    inject: 'body-last'  ,

    /**
     * custom dom id
     * @default: __svg__icons__dom__
     */
    customDomId: '__svg__icons__dom__',
  }),  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
    Components({
      resolvers: [ElementPlusResolver()],
    }), ],

  // publicDir:'/myblog',
  // base:'/myblog/',
  resolve: {
    //导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      {find:'path',replacement: "path-browserify",}
    ],
  },
  build: {
    outDir:'zfile-vue'
    ,
    // sourcemap: true,
    // minify: false,
  },
  server: {
    port: 9100,
  },
});