<script setup lang="ts">
import { useHeaderStore } from "../stores/counter";

const headerStore = useHeaderStore();

headerStore.routeName = "test";
</script>
<template>
  <div class="w-full flex justify-center items-center self-center content-center overflow-auto">
    <router-view />
  </div>
</template>