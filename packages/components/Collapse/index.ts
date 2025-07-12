import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@z-el/utils";

export const ZelCollapse = withInstall(Collapse);
export const ZelCollapseItem = withInstall(CollapseItem);

export * from './type.ts'
