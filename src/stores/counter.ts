import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { Vocabulary } from "../types/Vocabulary";
import { outputVocabularyData, activeSave } from "../demos/ipc";

export const useHeaderStore = defineStore("headerCounter", () => {
  const routeName = ref("");
  const content = ref("");
  return { routeName, content };
});

export const useVocabularyStore = defineStore("vocabularyCounter", () => {
  const map = reactive(new Map<string, Vocabulary>());

  function initVocabularys() {
    outputVocabularyData.forEach((vocabulary) => {
      map.set(vocabulary.name, vocabulary);
    });
  }
  initVocabularys();

  function getVocabulary(name: string): Vocabulary | undefined {
    return map.get(name);
  }

  function addVocabulary(vocabulary: Vocabulary) {
    map.set(vocabulary.name, vocabulary);
    activeSave(vocabularys.value);
  }

  function deleteVocabulary(name: string) {
    map.delete(name);
  }

  const vocabularys = computed(() => Array.from(map.values()));

  return { map, initVocabularys, getVocabulary, addVocabulary, deleteVocabulary, vocabularys };
});

export const useTestVocabularyStore = defineStore("testVocabularyCounter", () => {
  const totalNum = ref(0);
  const testedNum = computed(() => totalNum.value - testVocabularys.value.length);

  const testVocabularys = ref([]);

  function initTest(testNum: number, vocabulary: Vocabulary) {
    totalNum.value = testNum;
    const vocabularyData = Object.assign([], vocabulary.data);
    if (testNum == vocabularyData.length) {
      testVocabularys.value = vocabularyData;
      return;
    }
  }

  return { totalNum, testedNum, testVocabularys, initTest };
});
