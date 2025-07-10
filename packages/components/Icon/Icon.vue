<script setup lang="ts">
import type {IconProps} from "./types.ts";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from 'lodash-es'
import {computed} from "vue";

defineOptions({
  name: 'ZelIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

const filterProps = computed(() => omit(props, ["type", "color", "size"]))

const customStyle = computed(() => ({color: props.color ?? void 0}))
</script>

<template>
  <i
    class="zel-icon"
    :class="[`zel-icon-${props.type}`]"
    :style="customStyle"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
.zel-icon {
  --zel-icon-color: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--zel-icon-color);
  font-size: inherit;
}
@each $val in primary, info, success, warning, danger {
  .zel-icon--$(val) {
    --zel-icon-color: var(--zel-color-$(val));
  }
}
</style>