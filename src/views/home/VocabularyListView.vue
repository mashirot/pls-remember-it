<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHeaderStore, useVocabularyStore } from "../../stores/counter";

const router = useRouter();
const vocabularyStore = useVocabularyStore();
const headerCounter = useHeaderStore();

headerCounter.routeName = "home";
</script>
<template>
  <div class="h-full w-full border border-black">
    <div class="p-5 flex gap-5 flex-wrap justify-center items-center">
      <div v-if="vocabularyStore.vocabularys.length === 0">No Data</div>
      <div
        v-else
        v-for="(item, idx) in vocabularyStore.vocabularys"
        :key="idx"
        class="w-54 basis-auto"
      >
        <n-card
          @click="router.push({name: 'test-choose', params: { name: item.name }})"
          :title="item.name"
          header-class="truncate text-center"
          class="h-30 hover:cursor-pointer"
        >
          <div class="text-center">共 {{ item.data.length }} 条</div>
        </n-card>
      </div>
    </div>
  </div>
</template>
