<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTestVocabularyStore } from "../../stores/counter";
import { ComputedRef, computed, reactive } from "vue";
import Result from "../../types/ResultRow";

const router = useRouter();
const testVocabularyStore = useTestVocabularyStore();

const columns = reactive([
  {
    title: "题目",
    key: "question"
  },
  {
    title: "答案",
    key: "correctAnswer"
  },
  {
    title: "回答",
    key: "yourAnswer"
  }
]);

const result: ComputedRef<Array<Result>> = computed(() => {
  const testQuestion = testVocabularyStore.testVocabularys;
  const testAnswers = testVocabularyStore.testAnswers;

  const data = [];
  for (let idx = 0; idx < testQuestion.length; idx++) {
    const question = testQuestion[idx];
    const item = new Result(
      question.key,
      question.value,
      testAnswers[idx],
      testAnswers[idx] === question.value
    );
    data.push(item);
  }
  return data;
});

function handleRowClass(rowData: Result): string {
  if (!rowData.isCorrect) {
    return "data-row wrong-row";
  }
  return "data-row";
}
</script>
<template>
  <div
    class="min-w-56 max-w-72 min-h-64 max-h-[450px] my-5 py-5 flex flex-col gap-3 justify-evenly items-center rounded-xl border border-black"
  >
    <div>
      正确率：
      {{
        (Math.round((testVocabularyStore.correctNum / testVocabularyStore.totalNum) * 100) / 100) *
        100
      }}
      %
    </div>
    <div class="max-h-96 overflow-auto rounded border">
      <n-data-table :columns="columns" :data="result" :row-class-name="handleRowClass" :bordered="true" />
    </div>
    <div class="flex gap-3">
      <n-button @click="router.go(-2)" tertiary>返回测试</n-button>
      <n-button @click="router.push({ name: 'home-list' })" tertiary>返回主页</n-button>
    </div>
  </div>
</template>
<style scoped>
:deep(.data-row td) {
  text-align: center;
  color: rgb(22 163 74);
}
:deep(.wrong-row td) {
  color: rgb(239 68 68);
}
</style>