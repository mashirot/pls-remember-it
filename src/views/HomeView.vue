<script setup lang="ts">
import { useHeaderStore } from '../stores/counter';

const headerCounter = useHeaderStore();
headerCounter.routeName = "home";
</script>
<template>
  <div class="h-full w-full">
    <router-view />
  </div>
</template>
<style scoped></style>
