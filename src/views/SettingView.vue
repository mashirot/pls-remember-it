<script setup lang="ts">
import { ref } from "vue";

const arr = ref([
  "50音",
  "Unit1",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2",
  "Unit2"
]);
</script>
<template>
  <div class="flex flex-nowrap">
    <div class="w-28 border-r-2 text-center shrink-0">
      <ul>
        <li class="h-10 leading-10 hover:bg-slate-200 hover:cursor-pointer">管理词库</li>
      </ul>
    </div>
    <div class="p-5 flex gap-5 flex-wrap justify-start items-center">
      <div v-if="arr.length === 0">No Data</div>
      <div v-else v-for="(item, idx) in arr" class="w-40 basis-auto">
        <n-card :title="item" header-class="truncate" class="h-30">
          <div class="flex gap-2 justify-evenly">
            <n-button strong secondary size="tiny" type="primary">Edit</n-button>
            <n-button strong secondary size="tiny" type="Error">Delete</n-button>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.n-card-header__main) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
