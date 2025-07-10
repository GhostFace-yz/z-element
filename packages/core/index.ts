import {makeInstaller} from "@z-el/utils";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from "./components.ts";
import '@z-el/theme/index.css'

library.add(fas)
const installer = makeInstaller(components)
export * from '@z-el/components'
export default installer;