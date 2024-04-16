import { Vocabulary } from "../types/Vocabulary";

export let outputVocabularyData: Array<Vocabulary> = [];
export let inputVocabularyData: Array<Vocabulary> = [];

window.ipcRenderer.on("main-process-message", (_event, ...args) => {
  console.log("[Receive Main-process message]:", ...args);
});

window.ipcRenderer.on("program-ready", (_event, ...args) => {
  console.log("[Receive Main-process message]:", ...args);
  outputVocabularyData = args[0];
});

window.ipcRenderer.on("program-close", () => {
  saveVocabulary();
});

function saveVocabulary() {
  window.ipcRenderer.send("save-vocabulary", JSON.stringify(inputVocabularyData));
}

export function activeSave(vocabularys: Array<Vocabulary>) {
  inputVocabularyData = vocabularys;
  saveVocabulary();
}