<template>
  <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-sky-500 transition-all">
    <div class="flex items-center gap-3 mb-4">
      <span class="text-2xl">{{ category.icon }}</span>
      <h3 class="text-xl font-bold text-zinc-100">{{ category.title }}</h3>
    </div>
    <p class="text-zinc-400 text-sm mb-6">{{ category.description }}</p>
    
    <div class="space-y-3">
      <div v-for="item in category.links" :key="item.name" 
           class="flex items-center justify-between bg-zinc-800/50 p-3 rounded-lg group">
        <span class="text-zinc-200 group-hover:text-sky-400 transition-colors">{{ item.name }}</span>
        <div class="flex items-center gap-2">
          <span v-if="item.code" class="text-xs bg-zinc-700 px-2 py-1 rounded text-zinc-400">码: {{ item.code }}</span>
          <a :href="item.url" target="_blank" 
             class="text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded transition-colors">
            打开网盘
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['category'])
</script>