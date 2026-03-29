<template>
  <main class="container max-w-5xl mx-auto py-12 px-4 font-sans">
    <header class="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8 flex justify-between items-end">
      <div>
        <h1 class="text-4xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">课题组周报与积分系统</h1>
        <p class="text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          自动同步至 GitHub 归档，写周报自动计 2 分。
        </p>
      </div>
      <button
        @click="toggleAdmin"
        class="text-xs px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all font-medium"
      >
        {{ isAdmin ? '🔒 退出管理模式' : '🔑 管理员登录' }}
      </button>
    </header>

    <section class="bg-white dark:bg-zinc-900/50 p-6 rounded-2xl mb-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div class="flex items-center gap-2 mb-6">
        <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100">课题组积分情况</h2>
        <span v-if="isPointLoading" class="text-xs text-zinc-400 animate-pulse">(云端同步中...)</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div
          v-for="user in CONFIG.TEAM_MEMBERS"
          :key="user"
          class="p-4 rounded-xl bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-md text-center"
        >
          <div class="text-xs text-zinc-500 mb-1">{{ user }}</div>
          <div class="text-2xl font-black text-sky-600">
            {{ allPoints[user] || 0 }} <span class="text-[10px] font-normal text-zinc-400">pts</span>
          </div>

          <div v-if="isAdmin" class="mt-3 flex gap-1 border-t border-zinc-200 dark:border-zinc-800 pt-2">
            <button
              @click="updatePoint(user, -1, '管理员手动调分')"
              class="flex-1 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-[10px] hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              -1
            </button>
            <button
              @click="updatePoint(user, 1, '管理员手动调分')"
              class="flex-1 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-600 rounded text-[10px] hover:bg-sky-200"
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </section>

    <section
      class="bg-white dark:bg-zinc-900/50 p-6 rounded-2xl mb-10 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden relative"
    >
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100">{{ week }} 提交情况</h2>
          <span class="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded text-xs font-mono">
            {{ submissionRate.count }} / {{ CONFIG.TEAM_MEMBERS.length }}
          </span>
        </div>
        <div class="text-sm font-bold" :class="submissionRate.percent === 100 ? 'text-emerald-500' : 'text-sky-600'">
          完成率 {{ submissionRate.percent }}%
        </div>
      </div>

      <div class="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-1000 ease-out"
          :style="{ width: submissionRate.percent + '%' }"
        ></div>
      </div>

      <div class="flex flex-wrap gap-3">
        <div
          v-for="status in currentWeekStatus"
          :key="status.name"
          class="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300"
          :class="
            status.hasSubmitted
              ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 shadow-sm shadow-emerald-100/50'
              : 'bg-zinc-50 border-zinc-100 dark:bg-zinc-800/30 dark:border-zinc-700 text-zinc-400 italic'
          "
        >
          <span class="text-sm font-semibold">{{ status.name }}</span>
          <span v-if="status.hasSubmitted" class="text-xs">✅</span>
          <span v-else class="text-[10px] px-1 bg-zinc-200 dark:bg-zinc-700 rounded ml-1">未提交</span>
        </div>
      </div>
    </section>

    <section class="bg-white dark:bg-zinc-900/50 p-6 rounded-2xl mb-10 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h2 class="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <span>📝 提交本周周报</span>
        <span class="text-xs font-normal text-zinc-400">(Markdown 格式保存)</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label class="block mb-1 text-sm font-medium">姓名</label>
          <select
            v-model="name"
            class="w-full p-2.5 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
          >
            <option value="" disabled>请选择你的姓名</option>
            <option v-for="user in CONFIG.TEAM_MEMBERS" :key="user" :value="user">{{ user }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">周次 (已自动计算)</label>
          <input
            v-model="week"
            readonly
            class="w-full p-2.5 rounded-lg bg-zinc-100 dark:bg-black/80 border border-zinc-300 dark:border-zinc-700 outline-none text-zinc-500 cursor-not-allowed"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium">周报内容</label>
        <textarea
          v-model="content"
          rows="5"
          class="w-full p-2.5 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
          placeholder="请输入本周研究进展..."
        ></textarea>
      </div>
      <div class="mb-6">
        <label class="block mb-1 text-sm font-medium">附件 (可选，支持图片/PDF/Zip)</label>
        <input
          type="file"
          @change="handleFileChange"
          class="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition-all"
        />
      </div>
      <button
        @click="submitToGitHub"
        :disabled="isSubmitting"
        class="bg-sky-600 hover:bg-sky-500 disabled:bg-zinc-500 text-white p-4 rounded-xl w-full font-bold transition-all shadow-lg flex justify-center items-center gap-2"
      >
        <span v-if="isSubmitting" class="animate-spin">🌀</span>
        {{ isSubmitting ? '正在同步云端...' : '确认提交周报 (+2积分奖励)' }}
      </button>
    </section>

    <div class="flex items-center gap-4 mb-8">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-white font-mono">周报汇集存档</h2>
      <div class="h-[1px] flex-grow bg-zinc-200 dark:bg-zinc-800"></div>
    </div>

    <div v-if="isLoading" class="text-center py-20 text-zinc-500 italic">正在获取云端数据...</div>

    <div v-else class="space-y-4">
      <div
        v-for="(reports, username) in groupedByUser"
        :key="username"
        class="overflow-hidden bg-white dark:bg-zinc-900/30 rounded-2xl border border-zinc-200 dark:border-zinc-800"
      >
        <div
          @click="toggleUser(String(username))"
          class="flex items-center justify-between p-5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">👨‍🎓</div>
            <div>
              <h3 class="text-lg font-bold dark:text-white">{{ username }}</h3>
              <p class="text-xs text-zinc-500">累计已存档 {{ reports.length }} 份周报</p>
            </div>
          </div>
          <div class="w-4 h-4 transition-transform text-zinc-400" :class="{ 'rotate-180': isExpanded(String(username)) }">▼</div>
        </div>

        <div
          v-show="isExpanded(String(username))"
          class="p-4 bg-zinc-50/10 space-y-2 border-t border-zinc-100 dark:border-zinc-800"
        >
          <div
            v-for="(item, idx) in reports"
            :key="idx"
            @click="selectedReport = item"
            class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex justify-between items-center cursor-pointer hover:border-sky-500 transition-all shadow-sm group"
          >
            <span class="text-sm font-bold text-sky-600 group-hover:underline">{{ item.week }}周报</span>
            <div class="flex items-center gap-3">
              <span v-if="item.attachmentUrl" class="text-sm">📎</span>
              <span class="text-xs text-zinc-400 italic">查看详情</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="selectedReport"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="selectedReport = null"
      >
        <div
          class="bg-white dark:bg-zinc-900 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8"
        >
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-2xl font-bold text-zinc-900 dark:text-white">{{ selectedReport.week }}报告详情</h2>
              <p class="text-zinc-500 text-sm mt-1">提交人：{{ selectedReport.name }}</p>
            </div>
            <button
              @click="selectedReport = null"
              class="text-2xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
          <div class="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed border-l-4 border-sky-500 pl-4 mb-8">
            {{ selectedReport.content }}
          </div>
          <div
            v-if="selectedReport.attachmentUrl"
            class="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-between border border-zinc-200 dark:border-zinc-700"
          >
            <span class="text-xs text-zinc-500 font-medium font-mono">ATTACHMENT_READY</span>
            <a
              :href="selectedReport.attachmentUrl"
              target="_blank"
              class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md"
              >下载预览</a
            >
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const CONFIG = {
  GH_USER: 'lijerry632-del',
  GH_REPO: 'lab-website',
  GH_TOKEN: useRuntimeConfig().public.ghToken,
  TEAM_MEMBERS: ['杨浩', '吴昊', '唐毛毛', '王明锐', '丛敬越', '韩翼', '李佳瑞'],
  SEMESTER_START: '2026-03-02',
}

// 响应式变量
const name = ref('')
const week = ref('')
const content = ref('')
const reportList = ref<any[]>([])
const allPoints = ref<Record<string, number>>({})
const isLoading = ref(true)
const isPointLoading = ref(false)
const isSubmitting = ref(false)
const isAdmin = ref(false)
const expandedUsers = ref<string[]>([])
const selectedReport = ref<any>(null)
const selectedFile = ref<File | null>(null)

// 计算属性：本周提交情况
const currentWeekStatus = computed(() => {
  const currentWeekStr = week.value
  const submittedNames = reportList.value.filter((r) => r.week === currentWeekStr).map((r) => r.name)

  return CONFIG.TEAM_MEMBERS.map((m) => ({
    name: m,
    hasSubmitted: submittedNames.includes(m),
  }))
})

const submissionRate = computed(() => {
  const done = currentWeekStatus.value.filter((s) => s.hasSubmitted).length
  const total = CONFIG.TEAM_MEMBERS.length
  return {
    count: done,
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
  }
})

// 分组计算
const groupedByUser = computed(() => {
  const groups: Record<string, any[]> = {}
  reportList.value.forEach((r) => {
    const key = String(r.name)
    if (!groups[key]) groups[key] = []
    groups[key].push(r)
  })
  return groups
})

// 初始化
onMounted(async () => {
  const start = new Date(CONFIG.SEMESTER_START)
  const diff = new Date().getTime() - start.getTime()
  const weekNum = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7))
  week.value = weekNum > 0 ? `第${weekNum}周` : '预备周'

  await Promise.all([loadAllReports(), loadPoints()])
})

// 1. 加载积分
async function loadPoints() {
  isPointLoading.value = true
  try {
    const res = await fetch(`https://api.github.com/repos/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/contents/points.json`, {
      headers: { Authorization: `token ${CONFIG.GH_TOKEN}` },
    })
    if (!res.ok) throw new Error()
    const data = await res.json()
    allPoints.value = JSON.parse(decodeURIComponent(escape(atob(data.content))))
  } catch (e) {
    allPoints.value = {}
  } finally {
    isPointLoading.value = false
  }
}

// 2. 积分更新
async function updatePoint(uname: string, change: number, reason: string = '积分变动') {
  try {
    const res = await fetch(`https://api.github.com/repos/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/contents/points.json`, {
      headers: { Authorization: `token ${CONFIG.GH_TOKEN}` },
    })

    let currentData: Record<string, number> = {}
    let sha = ''

    if (res.ok) {
      const data = await res.json()
      sha = data.sha
      currentData = JSON.parse(decodeURIComponent(escape(atob(data.content))))
    }

    currentData[uname] = (currentData[uname] || 0) + change

    const putRes = await fetch(`https://api.github.com/repos/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/contents/points.json`, {
      method: 'PUT',
      headers: { Authorization: `token ${CONFIG.GH_TOKEN}` },
      body: JSON.stringify({
        message: `${reason}: ${uname} (${change > 0 ? '+' : ''}${change})`,
        content: btoa(unescape(encodeURIComponent(JSON.stringify(currentData, null, 2)))),
        sha: sha || undefined,
      }),
    })

    if (putRes.ok) allPoints.value = { ...currentData }
  } catch (e) {
    alert('同步积分失败')
  }
}

// 3. 处理附件
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) selectedFile.value = target.files[0]
}

// 4. 提交逻辑
async function submitToGitHub() {
  if (!name.value || !content.value) return alert('请填全姓名和周报内容')
  isSubmitting.value = true
  let attachmentLink = ''

  try {
    if (selectedFile.value) {
      const reader = new FileReader()
      const fileBase64 = await new Promise((resolve) => {
        reader.onload = () => resolve((reader.result as string).split(',')[1])
        reader.readAsDataURL(selectedFile.value!)
      })
      const attachPath = `weekly/attachments/${Date.now()}_${selectedFile.value.name}`
      await fetch(`https://api.github.com/repos/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/contents/${attachPath}`, {
        method: 'PUT',
        headers: { Authorization: `token ${CONFIG.GH_TOKEN}` },
        body: JSON.stringify({ message: `附件: ${selectedFile.value.name}`, content: fileBase64 }),
      })
      attachmentLink = `https://raw.githubusercontent.com/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/main/${attachPath}`
    }

    const mdPath = `weekly/${name.value}/${week.value}.md`
    const mdBody = `---\nname: ${name.value}\nweek: ${week.value}\n---\n## 本周工作\n${content.value}\n\n${attachmentLink ? `[附件](${attachmentLink})` : ''}`

    const res = await fetch(`https://api.github.com/repos/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/contents/${mdPath}`, {
      method: 'PUT',
      headers: { Authorization: `token ${CONFIG.GH_TOKEN}` },
      body: JSON.stringify({
        message: `周报: ${name.value} - ${week.value}`,
        content: btoa(unescape(encodeURIComponent(mdBody))),
      }),
    })

    if (res.ok) {
      await updatePoint(name.value, 2, '提交周报奖励')
      alert('✅ 提交成功，获得 2 积分！')
      location.reload()
    }
  } catch (e) {
    alert('提交异常，请检查 Token')
  } finally {
    isSubmitting.value = false
  }
}

// 5. 加载数据
async function loadAllReports() {
  isLoading.value = true
  try {
    const res = await fetch(`https://api.github.com/repos/${CONFIG.GH_USER}/${CONFIG.GH_REPO}/contents/weekly`, {
      headers: { Authorization: `token ${CONFIG.GH_TOKEN}` },
    })
    const dirs = await res.json()
    if (!Array.isArray(dirs)) return

    const allData: any[] = []
    for (const d of dirs) {
      if (d.type === 'dir' && d.name !== 'attachments') {
        const fRes = await fetch(d.url, { headers: { Authorization: `token ${CONFIG.GH_TOKEN}` } })
        const files = await fRes.json()
        for (const f of files) {
          if (f.name.endsWith('.md')) {
            const rawRes = await fetch(f.download_url)
            const raw = await rawRes.text()
            const attachmentMatch = raw.match(/\[附件\]\((.*)\)/)
            const pureContent = raw!
              .replace(/---[\s\S]*?---/, '')!
              .replace(/## 本周工作/, '')!
              .split('[附件]')[0]!
              .trim()

            allData.push({
              name: d.name,
              week: f.name.replace('.md', ''),
              content: pureContent,
              attachmentUrl: attachmentMatch ? attachmentMatch[1] : null,
            })
          }
        }
      }
    }
    reportList.value = allData.sort((a, b) => b.week.localeCompare(a.week))
  } finally {
    isLoading.value = false
  }
}

// 管理员功能
function toggleAdmin() {
  if (!isAdmin.value) {
    const p = prompt('请输入管理员密码')
    if (p === 'cqu123') isAdmin.value = true
  } else isAdmin.value = false
}

const toggleUser = (u: string) => {
  const i = expandedUsers.value.indexOf(u)
  i > -1 ? expandedUsers.value.splice(i, 1) : expandedUsers.value.push(u)
}
const isExpanded = (u: string) => expandedUsers.value.includes(u)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 10px;
}
</style>
