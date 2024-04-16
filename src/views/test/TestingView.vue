<script setup lang="ts">
import { useHeaderStore, useTestVocabularyStore } from '../../stores/counter';

const testVocabularyStore = useTestVocabularyStore();
const headerStore = useHeaderStore();

headerStore.routeName = "test";
</script>
<template>
  <div>
    {{ testVocabularyStore.testVocabularys }}
    <button @click="testVocabularyStore.testVocabularys.shift">111</button>
  </div>
</template>
