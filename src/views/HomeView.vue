<script setup lang="ts">
import { useHeaderStore } from '../stores/counter';

const headerCounter = useHeaderStore();
headerCounter.routeName = "home";
</script>
<template>
  <div class="w-full flex flex-auto m-2">
    <router-view />
  </div>
</template>
<style scoped></style>
