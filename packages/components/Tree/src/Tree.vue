<template>
  <div :class="bem.b()">
    <HTreeNode
      v-for="node in flattenTree"
      :node
      :key="node.key"
      :expanded="isExpanded(node)"
      @toggle="toggleExpand"
    >
    </HTreeNode>
  </div>
</template>

<script setup lang="ts">
import { treeProps, TreeNode, TreeOptions } from "./tree";
import { computed, ref, watch } from "vue";
import { createNamespace } from "@blu3trap/utils/create";
import HTreeNode from "./TreeNode.vue";
// 定义组件选项
defineOptions({
  name: "HTree",
});
const bem = createNamespace("tree");

// 定义组件的 props
const props = defineProps(treeProps);

// 定义树节点的响应式引用
const tree = ref<TreeNode[]>([]);

// 格式化单个节点
const formatOptions = (
  data: TreeOptions,
  parentKey: string = "",
  level: number = 1
): TreeNode => {
  return {
    label: data[props.labelField] as string,
    key: data[props.keyField] as string,
    level: level,
    children: (data[props.childrenField]
      ? (data[props.childrenField] as TreeOptions[]).map((child) =>
          formatOptions(child, data[props.keyField] as string, level + 1)
        )
      : []) as TreeNode[],
    rawNode: data,
    isLeaf:
      data.isLeaf ?? (data[props.childrenField] as TreeOptions[])?.length === 0,
    parentKey,
  };
};

// 格式化整个树
const formatTree = (data: TreeOptions[]): TreeNode[] => {
  return data.map((node) => {
    return formatOptions(node);
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
  },
  {
    immediate: true,
  }
);
const getExpandKeys = (): string[] => {
  return (
    typeof props.defaultExpandKeys === "string" ||
    typeof props.defaultExpandKeys === "number"
      ? [props.defaultExpandKeys].map((key) => String(key))
      : props.defaultExpandKeys
  ) as string[];
};
// 使用set存储 后面更好进行查找和删除
const expandKeys = ref<Set<string>>(new Set(getExpandKeys()));

// 展平树结构以便于渲染
const flattenTree = computed(() => {
  const flattenNodes: TreeNode[] = [];
  const nodes = [...tree.value].reverse();
  const reverseInStack = (nodes: TreeNode[]) => {
    while (nodes.length) {
      const node = nodes.pop();
      // shift 不仅要移除第一个元素，还需要将后续元素全部向前移动一位，时间复杂度为 O(n)，性能明显慢于 pop()
      if (!node) continue;
      flattenNodes.push(node);
      if (expandKeys.value.has(node.key as string)) {
        if (node.children && node.children.length) {
          reverseInStack([...node.children].reverse());
        }
      }
    }
  };
  reverseInStack(nodes);
  return flattenNodes;
});

// 判断节点是否展开
const isExpanded = (node: TreeNode): boolean => {
  return expandKeys.value.has(node.key as string);
};
// 展开节点
const expand = (node: TreeNode) => {
  if (node.isLeaf || node.loading) return;
  expandKeys.value.add(node.key as string);
  if (node.children && node.children.length) return;
  node.loading = true;
  props.load(node).then((res) => {
    node.children = res.map((v) => {
      return formatOptions(v, node.key as string, node.level + 1);
    });
    node.loading = false;
  });
};
// 折叠节点
const collpase = (node: TreeNode) => {
  expandKeys.value.delete(node.key as string);
};

// 切换节点的展开状态
const toggleExpand = (node: TreeNode) => {
  if (isExpanded(node)) {
    collpase(node);
  } else {
    expand(node);
  }
};
</script>

<style scoped></style>
