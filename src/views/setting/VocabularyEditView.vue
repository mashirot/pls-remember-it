<script setup lang="ts">
import { ref, reactive } from "vue";
import { Vocabulary } from "../../types/Vocabulary";
import { useHeaderStore, useVocabularyStore } from "../../stores/counter";
import { useRoute } from "vue-router";
import { FormInst, useNotification } from "naive-ui";

const route = useRoute();
const vocabularyStore = useVocabularyStore();
const headerCounter = useHeaderStore();
const notification = useNotification();

headerCounter.routeName = "setting";

const paramName = route.params.name;
const isCreate = paramName === "-1" || paramName === undefined;

const vocabulary = isCreate
  ? ref(new Vocabulary("", ""))
  : ref(vocabularyStore.getVocabulary(paramName as string));

const formRef = ref<FormInst | null>(null);
const rules = reactive({
  name: {
    required: true,
    message: "请输入词库名称",
    trigger: ["input", "blur"]
  },
  description: {
    required: false,
    message: "请输入描述",
    trigger: ["input"]
  }
});

function handleSave() {
  if (!handleValidateClick || !vocabulary.value || vocabulary.value.name.trim() === "") {
    return;
  }
  const vocabularyName = vocabulary.value.name;
  if (isCreate) {
    if (vocabularyStore.getVocabulary(vocabularyName)) {
      notification.warning({
        title: "词库名已存在",
        content: `词库 ${vocabularyName} 已存在，请更换词库名`,
        duration: 2500
      });
      return;
    }
    vocabularyStore.addVocabulary(vocabulary.value);
    notification.success({
      title: "保存成功",
      content: `成功新增词库 ${vocabularyName}`,
      duration: 2500
    });
    clearForm();
  } else {
    vocabularyStore.deleteVocabulary(paramName as string);
    vocabularyStore.addVocabulary(vocabulary.value);
    notification.success({
      title: "保存成功",
      content: `成功修改词库 ${vocabularyName}`,
      duration: 2500
    });
    clearForm();
  }
}

function clearForm() {
  vocabulary.value = new Vocabulary("", "");
}

function handleValidateClick(): boolean {
  formRef.value?.validate((errors) => {
    return !errors;
  });
  return false;
}
</script>
<template>
  <div class="w-full">
    <n-form ref="formRef" :label-width="80" :model="vocabulary" :rules="rules" size="medium">
      <n-form-item label="词库名" path="name">
        <n-input v-model:value="vocabulary!.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="描述" path="description">
        <n-input v-model:value="vocabulary!.description" placeholder="输入描述" />
      </n-form-item>
      <n-dynamic-input
        v-model:value="vocabulary!.data"
        preset="pair"
        key-placeholder="问题"
        value-placeholder="答案"
      />
      <n-form-item>
        <div class="w-full flex no-warp justify-end items-center gap-5">
          <n-button @click="clearForm" strong secondary type="warning">Clear</n-button>
          <n-button @click="handleSave" strong secondary type="primary">Save</n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>
