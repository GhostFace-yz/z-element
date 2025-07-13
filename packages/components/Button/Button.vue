<script setup lang="ts">
import {ref, computed, inject} from 'vue'
import type {ButtonProps, ButtonEmits, ButtonInstance} from "./type.ts";
import {throttle} from "lodash-es"
import ZelIcon from '../Icon/Icon.vue'
import {BUTTON_GROUP_CTX_KEY} from "./contants.ts";

/**
 * Button.vue 组件逻辑
 * Button.test.tsx 测试用例
 * type.ts ts类型声明
 * style.css
 * constants.ts 常量
 */
defineOptions({
  name: 'ZelButton',
})

const emits = defineEmits<ButtonEmits>();

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})

const slots = defineSlots()

const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)

const size = computed(() => ctx?.size?? props?.size?? '')

const type = computed(() => ctx?.type?? props?.type?? '')

const disabled = computed(() => ctx?.disabled || props?.disabled || false )

// 点击事件监听
const handleBtnClick = (e: MouseEvent) => emits('click', e)
// 节流
const handleBtnClickThrottle =  throttle(handleBtnClick, props.throttleDuration, {trailing: false})

const _ref = ref<HTMLButtonElement>()

const iconStyle = computed(() => ({marginRight: slots.default? '6px': '0px'}))

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
})

</script>
<template>
  <component
      ref="_ref"
      class="zel-button"
      :is="props.tag"
      :autofocus="autofocus"
      :type="tag ==='button'? nativeType:  void 0"
      :class="{
        [`zel-button--${type}`]: type,
        [`zel-button--${size}`]: size,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain
      }"
      :disabled="disabled || loading? true : void 0"
      @click="(e: MouseEvent) => useThrottle?handleBtnClickThrottle(e) :handleBtnClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <zel-icon
        class="loading-icon"
        :icon="loadingIcon ?? 'spinner'"
        :style="iconStyle"
        size="1x"
        spin
        />
      </slot>
    </template>
    <zel-icon v-if="icon && !loading" :icon="icon" size="1x"></zel-icon>
    <slot></slot>
  </component>
</template>
<style scoped>
@import './style.css';
</style>