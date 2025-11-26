import { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
}

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function Card({ children, className = '', padding = 'medium' }: CardProps) {
  return (
    <div className={`card padding-${padding} ${className}`}>
      {children}
    </div>
  )
}

export function StatCard({ icon, value, label, trend }: StatCardProps) {
  return (
    <Card className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && (
          <div className={`stat-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
    </Card>
  )
}
