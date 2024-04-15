<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHeaderStore, useVocabularyStore } from "../../stores/counter";
import { useNotification } from "naive-ui";

const router = useRouter();
const vocabularyStore = useVocabularyStore();
const headerCounter = useHeaderStore();
const notification = useNotification();

headerCounter.routeName = "setting";

function handleDelete(name: string) {
  vocabularyStore.deleteVocabulary(name);
  notification.success({
    title: "删除成功",
    content: `成功删除词库 ${name}`,
    duration: 2500
  });
}
</script>
<template>
  <div class="p-5 flex gap-5 flex-wrap justify-start items-center">
    <div v-if="vocabularyStore.vocabularys.length === 0">No Data</div>
    <div
      v-else
      v-for="(item, idx) in vocabularyStore.vocabularys"
      :key="idx"
      class="w-54 basis-auto"
    >
      <n-card :title="item.name" header-class="truncate text-center" class="h-30">
        <div class="flex gap-2 justify-evenly">
          <n-button
            @click="router.push({ name: 'setting-edit', params: { name: item.name } })"
            strong
            secondary
            size="tiny"
            type="primary"
            >Edit</n-button
          >
          <n-popconfirm @positive-click="handleDelete(item.name)" @negative-click=";">
            <template #trigger>
              <n-button strong secondary size="tiny" type="Error">Delete</n-button>
            </template>
            删除后无法恢复。
          </n-popconfirm>
        </div>
      </n-card>
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
