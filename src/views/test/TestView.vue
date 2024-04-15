<script setup lang="ts">
import { useHeaderStore } from '../../stores/counter';

const headerCounter = useHeaderStore();

headerCounter.routeName = "test";
</script>
<template>a</template>
