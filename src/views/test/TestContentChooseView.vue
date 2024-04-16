<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHeaderStore, useTestVocabularyStore, useVocabularyStore } from "../../stores/counter";
import { useMessage, useNotification } from "naive-ui";

const route = useRoute();
const router = useRouter();
const vocabularyStore = useVocabularyStore();
const testVocabularyStore = useTestVocabularyStore();
const headerCounter = useHeaderStore();

headerCounter.routeName = "test-choose";

const message = useMessage();
const notification = useNotification();

const vocabularyName = route.params.name as string;
const vocabulary = vocabularyStore.getVocabulary(vocabularyName);

const checkedValueRef = ref<string | null>("15");

const isCustom = ref(false);
const testNum = ref(15);

function handleSelChange(e: Event) {
  isCustom.value = false;
  checkedValueRef.value = (e.target as HTMLInputElement).value;
  testNum.value = parseInt(checkedValueRef.value!);
}

function handleStartTest() {
  if (testNum.value <= 0 || vocabulary?.data.length! <= 0) {
    message.error("测试个数不合法");
    return;
  }
  if (isCustom.value && checkedValueRef.value === null) {
    message.error("请选择测试个数");
    return;
  }
  if (testNum.value > vocabulary?.data.length!) {
    notification.warning({
      content: "测试个数大于单词个数，将按最大单词个数测试",
      duration: 2500
    });
    testNum.value = vocabulary?.data.length!;
  }
  prepare4Test();
  router.push({
    name: "test-testing"
  });
}

function prepare4Test() {
  testVocabularyStore.initTest(testNum.value, vocabulary!);
}
</script>
<template>
  <div class="w-64 my-0 mx-auto p-5 flex flex-col gap-4 rounded-lg border border-black">
    <div>请选择测试个数：</div>
    <div>
      <n-radio
        :checked="checkedValueRef === '15'"
        value="15"
        label="15"
        name="test-num-select"
        @change="handleSelChange"
      />
      <n-radio
        :checked="checkedValueRef === '30'"
        value="30"
        name="test-num-select"
        label="30"
        @change="handleSelChange"
      />
      <n-radio
        :checked="checkedValueRef === vocabulary?.data.length + ''"
        :value="vocabulary?.data.length + ''"
        name="test-num-select"
        label="All"
        @change="handleSelChange"
      />
    </div>
    <div class="flex flex-col gap-4">
      <n-radio
        :checked="isCustom"
        :value="''"
        name="test-num-select"
        label="Custom"
        @change="
          isCustom = true;
          checkedValueRef = '-1';
        "
      />
      <n-input-number
        v-model:value="testNum"
        :show-button="false"
        :min="0"
        :max="vocabulary?.data.length"
        :disabled="!isCustom"
      />
    </div>
    <div class="self-center">
      <n-button @click="handleStartTest" strong secondary> Start Test </n-button>
    </div>
  </div>
</template>
