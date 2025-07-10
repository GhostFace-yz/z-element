import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import {resolve} from "path";
import dts from 'vite-plugin-dts'
import {readdirSync} from "node:fs";
import {filter, map} from "lodash-es";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

// const COMP_NAMES = [
//   "Alert",
//   "Button",
//   "Collapse",
//   "Dropdown",
//   "Form",
//   "Icon",
//   "Input",
//   "Loading",
//   "Message",
//   "MessageBox",
//   "Notification",
//   "Overlay",
//   "PopConfirm",
//   "Select",
//   "Switch",
//   "Tooltip",
//   "Upload",
// ] as const

export default defineConfig({
  plugins: [vue(), dts(
    {
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/type',
    }
  )],
  build: {
    outDir: 'dist/es',
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
          return assetInfo.name as string;
        },
        // 分包
        manualChunks(id) {
          // console.log("=>(vite.es.config.ts:58) id", id);
          if (id.includes('node_modules')) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks"
          }
          if (id.includes("/packages/utils")) {
            return "utils"
          }
          for(const item of getDirectoriesSync("../components")) {
            if(id.includes(`packages/components/${item}`)) {
              return item
            }
          }
        },
      }
    }
  }
})