<script setup lang="ts">
import {ZelButton, ZelButtonGroup} from "z-el";
console.log("=>(App.vue:4) ZelButton", ZelButton);
console.log("=>(App.vue:3) ZelButtonGroup", ZelButtonGroup);
</script>

<template>
<zel-button icon="search" :useThrottle="false"></zel-button>
<!--<zel-button-group>-->
<!--  <zel-button>按钮1</zel-button>-->
<!--  <zel-button>按钮2</zel-button>-->
<!--</zel-button-group>-->
</template>

<style scoped>

</style>
