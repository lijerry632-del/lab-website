<template>
  <div class="max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">{{ userName }} 的周报汇总</h1>
    <p class="text-gray-400 mb-8">共 {{ userReports.length }} 份周报</p>

    <div class="space-y-6">
      <div
        v-for="(item, idx) in userReports"
        :key="idx"
        class="bg-gray-900 p-5 rounded-xl border border-gray-700"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-bold text-lg">{{ item.week }}</span>
          <span class="text-sm text-gray-400">{{ item.time }}</span>
        </div>
        <p class="text-gray-300 whitespace-pre-wrap mb-3">{{ item.content }}</p>
        <div v-if="item.attachments && item.attachments.length > 0">
          <span class="text-sm text-gray-400">附件：</span>
          <div class="mt-1">
            <a
              v-for="(att, i) in item.attachments"
              :key="i"
              :href="att.url"
              target="_blank"
              class="text-blue-400 mr-3 text-sm hover:underline"
            >📎 {{ att.name }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <NuxtLink to="/blogs" class="text-blue-400 hover:underline">← 返回周报首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const userName = route.params.name as string

// 读取所有周报
const allReports = ref<any[]>(JSON.parse(localStorage.getItem('reports') || '[]'))

// 筛选出当前人的所有周报
const userReports = computed(() => {
  return allReports.value.filter(r => r.name === userName)
})
</script>