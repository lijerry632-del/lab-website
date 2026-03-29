import type { MemberPoint, PointLog} from '~/types/points'

export const usePoints = () => {
  const POINT_KEY = 'lab-points'

  // 获取所有人积分
  const getAllPoints = (): MemberPoint[] => {
    if (process.client) {
      const data = localStorage.getItem(POINT_KEY)
      return data ? JSON.parse(data) : []
    }
    return []
  }

  // 按姓名获取成员积分（不存在则创建，初始为0）
  const getMemberPoint = (name: string): MemberPoint => {
    const list = getAllPoints()
    let item = list.find(i => i.name === name)
    if (!item) {
      item = { name, points: 0, logs: [] }
      list.push(item)
      saveAllPoints(list)
    }
    return item
  }

  // 保存全部积分
  const saveAllPoints = (list: MemberPoint[]) => {
    if (process.client) {
      localStorage.setItem(POINT_KEY, JSON.stringify(list))
    }
  }

  // 提交周报 +2 分
  const addReportPoint = (name: string) => {
    const list = getAllPoints()
    const item = getMemberPoint(name)
    item.points += 2
    item.logs.push({
      time: new Date().toLocaleString(),
      reason: '提交周汇报 +2 分',
      change: 2
    } as PointLog)
    saveAllPoints(list)
  }

  // 手动修改积分
  const changePoint = (
    name: string,
    change: number,
    reason: string
  ) => {
    const list = getAllPoints()
    const item = getMemberPoint(name)
    item.points += change
    item.logs.push({
      time: new Date().toLocaleString(),
      reason,
      change
    } as PointLog)
    saveAllPoints(list)
  }

  return {
    getAllPoints,
    getMemberPoint,
    addReportPoint,
    changePoint
  }
}