import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import { withInstall } from "@z-el/utils/install.ts"

export const ZelButton = withInstall(Button)
export const ZelButtonGroup = withInstall(ButtonGroup)

export * from  './type.ts'