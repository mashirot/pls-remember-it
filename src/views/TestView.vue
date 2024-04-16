<script setup lang="ts">
import { useHeaderStore } from '../stores/counter';

const headerStore = useHeaderStore();

headerStore.routeName = "test";
</script>
<template>
  <router-view />
</template>