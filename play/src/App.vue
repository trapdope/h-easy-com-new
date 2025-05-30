<template>
  <div>
    <HIcon color="#e60" size="40">
      <DiscSharp />
    </HIcon>
    <HIcon color="pink" size="40">
      <DiscSharp />
    </HIcon>
    <HTree :data="data"></HTree>
  </div>
</template>

<script setup lang="ts">
import { DiscSharp } from "@vicons/ionicons5";
import { ref } from "vue";

function createData(level = 4, baseKey = ""): any {
  if (!level) return [];
  const arr = new Array(6 - level).fill(0);
  return arr.map((_, index) => {
    const key = `${baseKey}${level}${index}`;
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

const data = ref(createData());
</script>

<style lang="less" scoped></style>
