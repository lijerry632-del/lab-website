export const useData = () => {
  // 读取本地存储
  const reports = ref<any[]>([])
  const points = ref<any[]>([])

  // 初始化
  onMounted(() => {
    const r = localStorage.getItem('reports')
    const p = localStorage.getItem('points')
    if (r) reports.value = JSON.parse(r)
    if (p) points.value = JSON.parse(p)
  })

  // 提交周报 + 自动加分
  function submitReport(name: string, week: string, content: string) {
    // 新增周报
    const newReport = { name, week, content, time: new Date().toLocaleString() }
    reports.value.unshift(newReport)

    // 加分逻辑
    const user = points.value.find(u => u.name === name)
    if (user) user.points += 2
    else points.value.push({ name, points: 2 })

    // 保存到本地
    localStorage.setItem('reports', JSON.stringify(reports.value))
    localStorage.setItem('points', JSON.stringify(points.value))
  }

  return {
    reports,
    points,
    submitReport
  }
}