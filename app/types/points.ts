export interface PointLog {
  time: string
  reason: string
  change: number
}

// ✅ 加上 reportCount 字段
export interface MemberPoint {
  name: string
  points: number
  logs: PointLog[]
  reportCount?: number 
}