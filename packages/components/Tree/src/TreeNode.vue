<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: props.node.level * 16 + 'px' }"
    >
      <span :class="[bem.e('loading-icon'), { loading: props.node.loading }]">
        <HIcon size="16" color="#ddd">
          <Sync />
        </HIcon>
      </span>
      <span
        @click="handleExpand"
        :class="[
          bem.e('expand-icon'),
          { expanded: props.expanded && !props.node.isLeaf },
          { [bem.is('leaf')]: props.node.isLeaf },
        ]"
      >
        <slot name="expandIcon">
          <HIcon size="16" class="loading">
            <Sync />
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
import Switcher from "./icon/Switcher";
import { ChevronForward, Sync } from "@vicons/ionicons5";
defineOptions({
  name: "HTreeNode",
});
const bem = createNamespace("tree-node");
const props = defineProps(treeNodeProps);

const emit = defineEmits(treeNodeEmits);
const handleExpand = () => {
  emit("toggle", props.node);
};
</script>

<style lang="less" scoped></style>
