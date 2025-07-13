import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import {resolve} from "path";
import dts from 'vite-plugin-dts'
import {readdirSync} from "fs";
import {filter, map, delay} from "lodash-es";
import shell from "shelljs";
import hooks from './hooksPlugin.ts'
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 800 as const

// 环境变量
const isProd = process.env.NODE_ENV === "production"
const isDev = process.env.NODE_ENV === "development"
const isTest = process.env.NODE_ENV === "test"

const moveStyles = () => {
  try {
    readdirSync('./dist/es/theme')
    shell.mv('./dist/es/theme', './dist')
  } catch (e) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY)
  }
}

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, {withFileTypes: true})

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

export default defineConfig({
  plugins: [
    vue(),
    dts(
      {
        tsconfigPath: '../../tsconfig.build.json',
        outDir: 'dist/types',
      }
    ),
    hooks({
      rmFiles:['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles
    }),
    terser({
      // 压缩配置：控制代码压缩的行为和程度
      compress: {
        // 分号保持：是否将连续语句用分号连接成序列（可减少代码体积）
        sequences: isProd,
        // 处理函数参数：是否优化函数参数（如移除未使用的参数）
        arguments: isProd,
        // 删除console.log：是否移除代码中的console.log语句（仅在生产环境生效）
        drop_console: isProd && ['log'],
        // 删除debugger：是否移除代码中的debugger语句（仅在生产环境生效）
        drop_debugger: isProd,
        // 压缩次数：执行压缩的迭代次数（次数越多，压缩越彻底，但耗时更长）
        passes: isProd? 4: 1,
        // 条件编译：定义全局常量，用于条件性地移除代码块
        global_defs: {
          '@DEV': JSON.stringify(isDev),     // 开发环境标识
          '@PROD': JSON.stringify(isProd),   // 生产环境标识
          '@TEST': JSON.stringify(isTest)    // 测试环境标识
        }
      },

      // 格式化配置：控制压缩后代码的输出格式（主要影响可读性）
      format: {
        // 分号：是否保留语句末尾的分号（false表示移除，减少代码体积）
        semicolons: false,
        // 简写：是否使用简写形式（如用'+'替代'Number()'）
        shorthand: isProd,
        // 花括号：是否保留冗余的花括号（如if语句的单语句块）
        braces: !isProd,
        // 注释：是否保留代码中的注释
        comments: !isProd,
        // 美化：是否美化输出的代码（开发环境更易读，生产环境保持压缩）
        beautify: !isProd,
      },

      // 混淆配置：控制变量和函数名的替换（增强代码安全性）
      mangle: {
        // 顶级变量：是否混淆全局作用域中的变量和函数名
        toplevel: isProd,
        // eval中的代码：是否混淆eval()中的代码
        eval: isProd,
        // 保留类名：是否保留类名不被混淆（开发环境保留，便于调试）
        keep_classnames: isDev,
        // 保留函数名：是否保留函数名不被混淆（开发环境保留，便于调试）
        keep_fnames: isDev
      }
    })
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'z-element',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name === 'style.css') return "index.css"
          if (
            assetInfo.type === 'asset' &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return 'theme/[name].[ext]'
          }
          return assetInfo.name as string;
        },
        // 分包
        manualChunks(id) {

          if (id.includes('node_modules')) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks"
          }
          if (id.includes("/packages/utils") || id.includes('plugin-vue:export-helper')) {
            return "utils"
          }
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`packages/components/${item}`)) {
              return item
            }
          }
        },
      }
    }
  }
})