<template>
  <div class="max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">额外积分申请</h1>
    <p class="text-gray-400 mb-8">申请活动、任务、奖励等额外积分</p>

    <!-- 积分申请表单（和周报页面完全同款风格） -->
    <div class="bg-gray-900 p-6 rounded-xl mb-10 border border-gray-700">
      <h2 class="text-xl font-bold mb-4">填写积分申请信息</h2>
      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm">姓名</label>
          <input v-model="name" class="w-full p-2 rounded bg-black/50 border border-gray-700" />
        </div>

        <div>
          <label class="block mb-1 text-sm">申请事项（活动/任务/奖励）</label>
          <input v-model="title" class="w-full p-2 rounded bg-black/50 border border-gray-700" />
        </div>

        <div>
          <label class="block mb-1 text-sm">申请积分</label>
          <input v-model.number="point" class="w-full p-2 rounded bg-black/50 border border-gray-700" />
        </div>

        <div>
          <label class="block mb-1 text-sm">详细说明</label>
          <textarea v-model="content" rows="5" class="w-full p-2 rounded bg-black/50 border border-gray-700"></textarea>
        </div>

        <button @click="submit" class="bg-blue-600 text-white p-3 rounded w-full font-bold">提交积分申请</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const title = ref('')
const point = ref(0)
const content = ref('')

function submit() {
  if (!name.value || !title.value || !point.value || !content.value) {
    alert('请填写完整信息')
    return
  }

  // 生成申请文件
  const date = new Date().toISOString().split('T')[0]
  const filename = `积分申请-${name.value}-${title.value}.md`
  const mdContent = `---
title: 积分申请 - ${name.value}
date: ${date}
---

# 积分申请

姓名：${name.value}
事项：${title.value}
申请积分：${point.value}

## 详细说明
${content.value}
`

  // 下载文件
  const blob = new Blob([mdContent], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)

  alert('提交成功！\n请将文件发送给管理员审核')

  // 清空
  name.value = ''
  title.value = ''
  point.value = 0
  content.value = ''
}
</script>
