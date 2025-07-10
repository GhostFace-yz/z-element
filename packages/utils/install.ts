import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function makeInstaller(components:Plugin[]) {
  const installer = (app:App) => each(components, c => app.use(c));
  console.log("=>(install.ts:9) installer", installer);
  return installer as Plugin;
}

export const withInstall = <T>(component: T) => {
  console.log("=>(install.ts:14) 注册", component);
  (component as SFCWithInstall<T>).install = (app:App) => {
    const name = (component as any).name;
    app.component(name, component as Plugin);
  }
  return component as SFCWithInstall<T>
}
