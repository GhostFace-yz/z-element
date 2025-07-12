import type { InjectionKey } from "vue";
import type { CollapseContext } from "./type.ts";

export const COLLAPSE_CTX_KEY: InjectionKey<CollapseContext> = Symbol("collapseContext");