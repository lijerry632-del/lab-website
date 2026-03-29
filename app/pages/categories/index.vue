<template>
  <main class="container max-w-5xl mx-auto py-10 px-4">
    <header class="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
      <h1 class="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">资料共享</h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-lg">这里汇集了课题组公共学习资源、学术文献及常用工具，请按需下载。</p>
    </header>

    <div
      class="mt-4 mb-10 flex items-center gap-2 bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 p-3 rounded-lg"
    >
      <span class="text-amber-600 dark:text-amber-500">💡</span>
      <p class="text-sm text-amber-800 dark:text-amber-200/80">
        需上传新资料？请将链接发送至管理员邮件或提交至
        <a href="#" class="underline hover:text-amber-600 dark:hover:text-amber-400 font-medium">资源收集表</a>。
      </p>
    </div>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="category in resourceCategories"
        :key="category.title"
        class="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-xl hover:border-sky-500/30 transition-all duration-300"
      >
        <div class="flex items-center gap-4 mb-4">
          <span class="text-3xl">{{ category.icon }}</span>
          <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{{ category.title }}</h2>
        </div>

        <p class="text-zinc-500 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
          {{ category.description }}
        </p>

        <div class="space-y-3">
          <div
            v-for="link in category.links"
            :key="link.name"
            class="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50 group"
          >
            <span
              class="text-zinc-700 dark:text-zinc-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors font-medium"
            >
              {{ link.name }}
            </span>
            <div class="flex items-center gap-3">
              <span v-if="link.code" class="text-[10px] font-mono text-zinc-500 bg-zinc-200 dark:bg-zinc-900 px-2 py-0.5 rounded">
                码: {{ link.code }}
              </span>
              <a
                :href="link.url"
                target="_blank"
                class="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded-lg transition-all shadow-md"
              >
                访问网盘
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { resourceCategories } from '~/data/resources'
import { useHead } from '#imports'

// 设置页面标题
useHead({
  title: '资料共享 - 课题组汇报平台',
})
</script>
