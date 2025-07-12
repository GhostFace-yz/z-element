<script setup lang="ts">
import type {CollapseEmits, CollapseProps, CollapseItemName} from './type.ts'
import {provide, ref, watch} from 'vue'
import {COLLAPSE_CTX_KEY} from './constants.ts'

defineOptions({
  name: 'ZelCollapse',
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue)
console.log("=>(Collapse.vue:13) activeNames", activeNames);
console.log("=>(Collapse.vue:13) props.modelValue", props.modelValue);
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item')
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value];
  // 手风琴模式
  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    // 存在，删除数组中的一项
    _activeNames.splice(index, 1);
  } else {
    // 不存在，插入对应 name
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}

const updateActiveNames = (newActiveNames: CollapseItemName[]) => {
  activeNames.value = newActiveNames;
  emits("update:modelValue", newActiveNames)
  emits("change", newActiveNames)
}

watch(
    () => props.modelValue,
    (newNames) => updateActiveNames(newNames),
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
})
</script>
<template>
  <div class="zel-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
