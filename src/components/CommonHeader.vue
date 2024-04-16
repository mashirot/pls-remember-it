<script setup lang="ts">
import { useRouter } from "vue-router";
import { DataObjectFilled as DataIcon, HomeRound as HomeIcon } from "@vicons/material";
import { useHeaderStore, useTestVocabularyStore } from "../stores/counter";

const router = useRouter();
const headerStore = useHeaderStore();
const testVocabularyStore = useTestVocabularyStore();

function switchView() {
  switch (headerStore.routeName) {
    case "home":
      handleRouterJump("setting");
      break;
    case "setting":
    case "test-choose":
    case "test":
      handleRouterJump("home");
      break;
    default:
      handleRouterJump("home");
  }
}

function handleRouterJump(targetName: string) {
  router.push({ name: targetName });
}
</script>

<template>
  <div class="h-10 relative flex justify-center content-center items-center border-b-2 border-gray">
    <div class="flex text-lg">
      <div v-if="headerStore.routeName === 'home'">Home</div>
      <div v-else-if="headerStore.routeName === 'setting'">Data Management</div>
      <div v-else-if="headerStore.routeName === 'test-choose'">[-/-]</div>
      <div v-else-if="headerStore.routeName === 'test'">
        [{{ testVocabularyStore.testedNum }}/{{ testVocabularyStore.totalNum }}]
      </div>
    </div>
    <div class="absolute right-0">
      <n-button circle @click="switchView">
        <template #icon>
          <n-icon v-if="headerStore.routeName === 'home'"><data-icon /></n-icon>
          <n-icon
            v-else-if="
              headerStore.routeName === 'test-choose' ||
              headerStore.routeName === 'test' ||
              headerStore.routeName === 'setting'
            "
            ><home-icon
          /></n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>
