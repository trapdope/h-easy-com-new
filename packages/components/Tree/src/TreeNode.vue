<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: props.node.level * 16 + 'px' }"
    >
      <span
        @click="handleExpand"
        :class="[
          bem.e('expand-icon'),
          { expanded: props.expanded && !props.node.isLeaf },
          { [bem.is('leaf')]: props.node.isLeaf },
        ]"
      >
        <slot name="expandIcon">
          <HIcon size="16" color="gray" :rotate="props.node.loading as boolean">
            <ChevronForward v-if="!props.node.loading" />
            <Sync v-else />
          </HIcon>
        </slot>
      </span>
      <span>
        {{ props.node.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { createNamespace } from "@blu3trap/utils/create";
import { treeNodeProps, treeNodeEmits } from "./tree";
import { ChevronForward, Sync } from "@vicons/ionicons5";
defineOptions({
  name: "HTreeNode",
});
const bem = createNamespace("tree-node");
const props = defineProps(treeNodeProps);

const emit = defineEmits(treeNodeEmits);

// 展开或收缩时告诉父组件 需要收缩的节点
const handleExpand = () => {
  emit("toggle", props.node);
};
</script>

<style lang="less" scoped></style>
