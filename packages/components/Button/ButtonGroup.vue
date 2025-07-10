<script setup lang="ts">
import type {ButtonGroupProps} from './type.ts'
import {provide, reactive, toRef} from 'vue'
import {BUTTON_GROUP_CTX_KEY} from './contants.ts'

defineOptions({
  name: 'ZelButtonGroup',
});
const props = defineProps<ButtonGroupProps>()

provide(
    BUTTON_GROUP_CTX_KEY,
    reactive({
      size: toRef(props, 'size'),
      type: toRef(props, 'type'),
      disabled: toRef(props, 'disabled'),
    })
)
</script>

<template>
  <div class="zel-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>