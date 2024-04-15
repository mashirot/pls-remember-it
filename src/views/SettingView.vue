<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useHeaderStore } from "../stores/counter";

const router = useRouter();

const headerCounter = useHeaderStore();
headerCounter.routeName = "setting";
headerCounter.content = "Data Management";
</script>
<template>
  <div class="flex flex-nowrap">
    <div class="w-28 border-r-2 text-center shrink-0">
      <ul>
        <li
          @click="router.push({ name: 'setting-list' })"
          class="h-10 leading-10 hover:bg-slate-200 hover:cursor-pointer"
        >
          管理词库
        </li>
        <li
          @click="router.push({ name: 'setting-edit', params: { name: -1 } })"
          class="h-10 leading-10 hover:bg-slate-200 hover:cursor-pointer"
        >
          新增词库
        </li>
      </ul>
    </div>
    <div class="p-5 w-full">
      <router-view />
    </div>
  </div>
</template>
