import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import {readFileSync} from 'fs'
import {compression} from "vite-plugin-compression2"
import {resolve} from "path";
import shell from 'shelljs'
import {delay} from 'lodash-es'
import hooks from './hooksPlugin.ts'
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 800 as const

// 环境变量
const isProd = process.env.NODE_ENV === "production"
const isDev = process.env.NODE_ENV === "development"
const isTest = process.env.NODE_ENV === "test"

const moveStyles = () => {
  try {
    readFileSync('./dist/umd/index.css.gz')
    shell.cp('./dist/umd/index.css', './dist/index.css')
  } catch (e) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i
    }),
    hooks({
      rmFiles: ['./dist.umd', './dist/index.css'],
      afterBuild: moveStyles
    }),
    terser({
      compress: {
        // 删除console.log：是否移除代码中的console.log语句（仅在生产环境生效）
        drop_console: ['log'],
        // 删除debugger：是否移除代码中的debugger语句（仅在生产环境生效）
        drop_debugger: true,
        // 压缩次数：执行压缩的迭代次数（次数越多，压缩越彻底，但耗时更长）
        passes: 3,
        // 条件编译：定义全局常量，用于条件性地移除代码块
        global_defs: {
          '@DEV': JSON.stringify(isDev),     // 开发环境标识
          '@PROD': JSON.stringify(isProd),   // 生产环境标识
          '@TEST': JSON.stringify(isTest)    // 测试环境标识
        }
      }
    })
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'z-element',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: "Vue"
        },
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name === 'style.css') return "index.css"
          return assetInfo.name as string;
        }
      }
    }
  }
})