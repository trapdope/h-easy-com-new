<template>tree</template>

<script setup lang="ts">
import { treeProps, TreeNode, TreeOptions } from "./tree";
import { ref, watch } from "vue";

// 定义组件选项
defineOptions({
  name: "HTree",
});

// 定义组件的 props
const props = defineProps(treeProps);

// 定义树节点的响应式引用
const tree = ref<TreeNode[]>([]);

// 用于记录当前节点的层级
let level = 1;
// 格式化单个节点
const formatOptions = (data: TreeOptions, level: number): TreeNode => {
  return {
    label: data[props.labelField] as string,
    key: data[props.keyField] as string,
    children: (data[props.childrenField]
      ? (data[props.childrenField] as TreeOptions[]).map((child) =>
          formatOptions(child, level + 1)
        )
      : []) as TreeNode[],
    rawNode: data,
    level,
  };
};

// 格式化整个树
const formatTree = (data: TreeOptions[]): TreeNode[] => {
  return data.map((node) => {
    return formatOptions(node, level);
  }) as TreeNode[];
};

// 创建树结构
const createTree = (data: TreeOptions[]): TreeNode[] => {
  const arr = formatTree(data);
  return arr;
};

// 监听 props.data 的变化并更新树结构
watch(
  () => props.data as TreeOptions[],
  (v) => {
    tree.value = createTree(v);
    console.log("tree.value", tree.value);
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
