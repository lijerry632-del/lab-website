<template>
  <main class="container max-w-5xl mx-auto py-12 px-4">
    <section class="mb-20">
      <div class="flex flex-col md:flex-row gap-10 items-center">
        <div class="md:w-1/2">
          <h1 class="text-4xl font-bold text-zinc-900 dark:text-white mb-6">{{ labInfo.name }}</h1>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
            {{ labInfo.description }}
          </p>
        </div>
        <div class="md:w-1/2 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <img :src="labInfo.image" alt="Lab Group" class="w-full h-auto hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center gap-4 mb-10">
        <h2 class="text-3xl font-bold text-zinc-900 dark:text-white">团队成员</h2>
        <div class="h-[1px] flex-grow bg-zinc-200 dark:bg-zinc-800"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in members"
          :key="member.email"
          class="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-sky-500/50 transition-all group relative overflow-hidden"
        >
          <div
            v-if="isToday(member.birthday)"
            class="absolute top-0 right-0 bg-pink-600 text-white text-[10px] px-3 py-1 rounded-bl-lg animate-pulse"
          >
            🎂 生日快乐
          </div>

          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-sky-400 transition-colors">
                {{ member.name }}
              </h3>
              <p class="text-sky-600 dark:text-sky-500/80 text-sm font-medium">{{ member.position }}</p>
            </div>
            <div class="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">🎓</div>
          </div>

          <div class="space-y-2 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/50 pt-4">
            <p class="flex items-center gap-2"><span class="opacity-60">籍贯:</span> {{ member.hometown }}</p>
            <p class="flex items-center gap-2"><span class="opacity-60">生日:</span> {{ member.birthday }}</p>
            <p class="flex items-center gap-2">
              <span class="opacity-60">邮箱:</span>
              <span class="font-mono text-xs text-sky-600 dark:text-sky-400/80">{{ member.email }}</span>
            </p>
            <p class="mt-3 text-xs italic text-zinc-400 dark:text-zinc-500">研究领域: {{ member.research }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { labInfo, members } from '~/data/members'

const isToday = (birthday) => {
  if (!birthday) return false
  const today = new Date()
  const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  return birthday === dateStr
}

useHead({ title: '关于我们 - 课题组汇报平台' })
</script>
