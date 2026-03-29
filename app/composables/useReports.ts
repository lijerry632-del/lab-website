import type { Ref } from 'vue'

// 定义周报数据类型
export interface ReportItem {
  name: string
  week: string
  content: string
  time: string
}

// 定义积分类型
export interface MemberPoint {
  name: string
  points: number
}

// 全局共享数据
const allReports = ref<ReportItem[]>([])
const userPoints = ref<MemberPoint[]>([])

export const useReports = () => {
  // 提交周报
  function addReport(name: string, week: string, content: string) {
    allReports.value.unshift({
      name,
      week,
      content,
      time: new Date().toLocaleString()
    })
  }

  // 积分逻辑（从0开始，提交周报+2）
  function addPoint(name: string) {
    const found = userPoints.value.find(u => u.name === name)
    if (found) {
      found.points += 2
    } else {
      userPoints.value.push({ name, points: 2 })
    }
  }

  return {
    allReports,
    userPoints,
    addReport,
    addPoint
  }
}