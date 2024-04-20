<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useHeaderStore, useTestVocabularyStore } from "../../stores/counter";
import { DoneRound, CloseRound } from "@vicons/material";

const testVocabularyStore = useTestVocabularyStore();
const headerStore = useHeaderStore();
headerStore.routeName = "test";

const router = useRouter();

const normalQuestionBoxClass =
  "relative min-w-28 min-h-28 p-4 text-2xl flex flex-col self-center justify-center items-center rounded-md border";
const wrongQuestionBoxClass =
  "relative min-w-28 min-h-28 p-4 text-2xl flex flex-col self-center text-red-500 justify-center items-center rounded-md border";
const normalQuestionClass = "text-center font-semibold";
const wrongQuestionClass = "text-center font-semibold animate-bounce";
const questionBoxClassRef = ref(normalQuestionBoxClass);
const questionClassRef = ref(normalQuestionClass);
const isShowCorrectAnswer = ref(false);
const inputAnswer = ref("");

const currQuestion = computed(() => {
  const idx = testVocabularyStore.getIdx();
  if (idx === -1) {
    return "";
  }
  return testVocabularyStore.testVocabularys[idx].key;
});

const currAnswer = computed(() => {
  const idx = testVocabularyStore.getIdx();
  if (idx === -1) {
    return "";
  }
  return testVocabularyStore.testVocabularys[idx].value;
});

function handleSubmit() {
  if (isShowCorrectAnswer.value) {
    handleEnsureWrong();
    return;
  }
  if (inputAnswer.value === "") {
    return;
  }
  if (inputAnswer.value === currAnswer.value) {
    testVocabularyStore.correctNum++;
    afterSubmit();
  } else {
    testVocabularyStore.wrongNum++;
    handleWrong();
  }
}

function handleWrong() {
  questionBoxClassRef.value = wrongQuestionBoxClass;
  questionClassRef.value = wrongQuestionClass;
  isShowCorrectAnswer.value = true;
}

function handleEnsureWrong() {
  questionBoxClassRef.value = normalQuestionBoxClass;
  questionClassRef.value = normalQuestionClass;
  isShowCorrectAnswer.value = false;
  afterSubmit();
}

function afterSubmit() {
  testVocabularyStore.testAnswers.push(inputAnswer.value);
  inputAnswer.value = "";
  if (testVocabularyStore.incIdx() === -1) {
    router.push({ name: "test-result" });
    return;
  }
}
</script>
<template>
  <div class="min-w-56 max-w-72 h-64 flex flex-col justify-evenly items-center rounded-xl border border-black">
    <div class="flex gap-4 justify-center items-center">
      <div class="flex flex-nowrap gap-2 items-center">
        <n-icon class="text-green-600">
          <done-round />
        </n-icon>
        <span class="text-green-600">{{ testVocabularyStore.correctNum }}</span> / {{ testVocabularyStore.totalNum }}
      </div>
      <div class="flex flex-nowrap gap-2 text-red-500 justify-center items-center">
        <n-icon>
          <close-round />
        </n-icon>
        <span class="">{{ testVocabularyStore.wrongNum }}</span>
      </div>
    </div>
    <div :class="questionBoxClassRef">
      <div :class="questionClassRef">
        {{ currQuestion }}
      </div>
      <div v-if="isShowCorrectAnswer" class="self-end text-base text-center">
        正确答案：{{ currAnswer }}
      </div>
    </div>
    <div class="w-32">
      <n-input v-model:value="inputAnswer" @keyup.enter="handleSubmit" type="text" placeholder="" />
    </div>
  </div>
</template>
