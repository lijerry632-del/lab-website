<script lang="ts" setup>
useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: '这里是课题组汇报平台',
    },
  ],
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 py-20">
    <div class="flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter">课题组汇报平台</h1>
        <p class="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">这里是课题组汇报平台。</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 如果需要特殊的动画效果可以写在这里 */
</style>
