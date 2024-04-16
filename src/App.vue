<script setup lang="ts">
import CommonHeader from "./components/CommonHeader.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <CommonHeader class="flex-shrink-0" />
    <div class="max-h-full flex flex-auto">
      <n-notification-provider :max="3">
        <n-message-provider :max="3">
          <router-view />
        </n-message-provider>
      </n-notification-provider>
    </div>
  </div>
</template>

<style></style>
