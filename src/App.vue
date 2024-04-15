<script setup lang="ts">
import CommonHeader from "./components/CommonHeader.vue";
</script>

<template>
  <div class="min-h-screen border border-black">
    <CommonHeader />
    <n-notification-provider :max="3">
      <n-message-provider :max="3">
        <router-view />
      </n-message-provider>
    </n-notification-provider>
  </div>
</template>

<style></style>
