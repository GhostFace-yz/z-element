import {makeInstaller} from "@z-el/utils";
import components from "./components.ts";
import '@z-el/theme/index.css'

const installer = makeInstaller(components)
export * from '@z-el/components'
export default installer;