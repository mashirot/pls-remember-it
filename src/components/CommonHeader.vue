<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DataObjectFilled as DataIcon, HomeRound as HomeIcon } from "@vicons/material";

const route = useRoute();
const router = useRouter();

const isHome = computed(() => route.name === "home");

function switchView() {
  if (isHome.value) {
    handleRouterJump("setting");
  } else {
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
      <div v-if="isHome">[-/-]</div>
      <div v-else>Data Manage</div>
    </div>
    <div class="absolute right-0">
      <n-button circle @click="switchView">
        <template #icon>
          <n-icon v-if="isHome"><data-icon /></n-icon>
          <n-icon v-else><home-icon /></n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>
