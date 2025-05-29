<template>
  <i :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { createNamespace } from "@blu3trap/utils/create";
import { iconProps } from "./icon";
defineOptions({
  name: "HIcon",
});
const bem = createNamespace("icon");
const props = defineProps(iconProps);

const style = computed(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { fontSize: props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>

<style scoped></style>
