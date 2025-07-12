<script setup lang="ts">
import {ZelButton, ZelButtonGroup,  ZelCollapse, ZelCollapseItem} from '@relic-yangzheng/z-element'
</script>

<template>
<!--<zel-button icon="search" :useThrottle="false"></zel-button>-->
<!--<zel-button-group>-->
<!--  <zel-button>按钮1</zel-button>-->
<!--  <zel-button>按钮2</zel-button>-->
<!--</zel-button-group>-->
  <zel-collapse accordion :modelValue="['a']">
    <zel-collapse-item title="title1" name="a">
      <div>this is content a</div>
    </zel-collapse-item>
    <zel-collapse-item name="b" title="Title b">
      <div>this is content b</div>
    </zel-collapse-item>
    <zel-collapse-item name="c" title="Title c disabled" disabled>
      <div>this is content c</div>
    </zel-collapse-item>
  </zel-collapse>
</template>

<style scoped>

</style>
