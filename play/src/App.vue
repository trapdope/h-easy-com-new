<template>
  <div>
    <HIcon color="#e60" size="40">
      <DiscSharp />
    </HIcon>
    <HIcon color="pink" size="40">
      <DiscSharp />
    </HIcon>
    <HTree :data="data" :load="load"> </HTree>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode, TreeOptions } from "@blu3trap/components/Tree/src/tree";
import { DiscSharp } from "@vicons/ionicons5";
import { ref } from "vue";
// 基础树
// function createData(level = 4, baseKey = ""): any {
//   if (!level) return [];
//   const arr = new Array(6 - level).fill(0);
//   return arr.map((_, index) => {
//     const key = `${baseKey}${level}${index}`;
//     return {
//       label: createLabel(level),
//       key,
//       children: createData(level - 1, key),
//     };
//   });
// }

// function createLabel(level: number): string {
//   if (level === 4) return "道生一";
//   if (level === 3) return "一生二";
//   if (level === 2) return "二生三";
//   if (level === 1) return "三生万物";
//   return "";
// }

// const data = ref(createData());
// 异步树
const data = ref([
  {
    key: "0",
    label: "根节点 1",
    isLeaf: false,
  },
  {
    key: "1",
    label: "根节点 2",
    isLeaf: false,
  },
  {
    key: "2",
    label: "根节点 3",
    isLeaf: true,
  },
]);
const createChildren = (node: TreeOptions): unknown => {
  console.log(node);

  const children = [];
  children.push(
    ...new Array(3).fill(null).map((v, i) => {
      return {
        key: `${node.key}-${i}`,
        label: `子节点${node.key}-${i}`,
        isLeaf: false,
      };
    })
  );
  return children as unknown;
};
const load = (node: TreeNode): Promise<TreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = createChildren(node);
      resolve(result as TreeNode[]);
    }, 100000);
  });
};
</script>

<style lang="less" scoped></style>
