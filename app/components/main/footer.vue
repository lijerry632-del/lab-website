<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.fullPath.replace('/', ''))
</script>

<template>
  <div class="border-t dark:border-gray-800 mt-5 text-center p-2 text-sm text-zinc-500">
    © 2026 杨老师课题组. All Rights Reserved.
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
