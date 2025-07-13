<script setup lang="ts">
import type { CollapseItemProps } from './type.ts'
import { inject, computed } from 'vue'
import { COLLAPSE_CTX_KEY } from "./constants.ts";
import ZelIcon from "../Icon/Icon.vue";
import transitionEvents from "./transitionEvents.ts";

defineOptions({
  name: 'ZelCollapseItem',
})
const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CTX_KEY, void 0);
const isActive = computed(() => {
  return ctx?.activeNames.value?.includes(props.name);
})

const handleClick = () => {
  if (props.disabled) return;
  ctx?.handleItemClick(props.name)
}

</script>

<template>
  <div
      class="zel-collapse-item"
      :class="{
      'is-disabled': disabled,
    }"
  >
    <div
        class="zel-collapse-item__header"
        :id="`item-header-${name}`"
        :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
        @click="handleClick"
    >
      <span class="zel-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <zel-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="zel-collapse-item__wrapper" v-show="isActive">
        <div class="zel-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
@import "./style.css";
</style>
