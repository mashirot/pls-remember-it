import { Ref, computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { Node, Vocabulary } from "../types/Vocabulary";
import { outputVocabularyData, activeSave } from "../demos/ipc";

export const useHeaderStore = defineStore("headerCounter", () => {
  const routeName = ref("");
  return { routeName };
});

export const useVocabularyStore = defineStore("vocabularyCounter", () => {
  const map = reactive(new Map<string, Vocabulary>());

  function initVocabularys() {
    outputVocabularyData.forEach((vocabulary) => {
      map.set(vocabulary.name, vocabulary);
    });
  }
  setTimeout(() => initVocabularys(), 500);

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

  function manualSave() {
    activeSave(vocabularys.value);
  }

  const vocabularys = computed(() => Array.from(map.values()));

  return {
    map,
    initVocabularys,
    getVocabulary,
    addVocabulary,
    deleteVocabulary,
    vocabularys,
    manualSave
  };
});

export const useTestVocabularyStore = defineStore("testVocabularyCounter", () => {
  const totalNum = ref(0);
  const testedNum = computed(() => correctNum.value + wrongNum.value);

  const correctNum = ref(0);
  const wrongNum = ref(0);

  const currQuestionIdx = ref(0);
  const testVocabularys: Ref<Array<Node>> = ref([]);
  const testAnswers: Ref<Array<string>> = ref([]);

  function initTest(testNum: number, vocabulary: Vocabulary) {
    totalNum.value = testNum;
    correctNum.value = 0;
    wrongNum.value = 0;
    currQuestionIdx.value = 0;
    testAnswers.value = [];

    const vocabularyData = Object.assign([], vocabulary.data);
    if (testNum >= vocabularyData.length) {
      totalNum.value = vocabularyData.length;
    }

    const tempVocabularys: Array<Node> = [];
    for (let idx = 0; idx < testNum; idx++) {
      const randIdx = getRandIdx(vocabularyData.length);
      tempVocabularys.push(vocabularyData[randIdx]);
      vocabularyData.splice(randIdx, 1);
    }
    testVocabularys.value = tempVocabularys;
  }

  function getRandIdx(length: number) {
    return Math.floor(Math.random() * length);
  }

  function incIdx(): number {
    if (currQuestionIdx.value >= testVocabularys.value.length - 1 || currQuestionIdx.value < 0) {
      currQuestionIdx.value = -1;
      return -1;
    }
    return currQuestionIdx.value++;
  }

  function getIdx() {
    return currQuestionIdx.value;
  }

  return {
    totalNum,
    testedNum,
    correctNum,
    wrongNum,
    testVocabularys,
    testAnswers,
    initTest,
    incIdx,
    getIdx
  };
});
