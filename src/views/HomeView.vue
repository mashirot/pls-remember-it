<script setup lang="ts">
import { onBeforeRouteUpdate } from 'vue-router';
import { useHeaderStore } from '../stores/counter';

const headerCounter = useHeaderStore();
headerCounter.routeName = "home";
headerCounter.content = "Home";
</script>
<template>
  <div class="h-full w-full">
    <router-view />
  </div>
</template>
<style scoped></style>
