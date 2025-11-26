import { ReactNode } from 'react'
import './GridLayout.css'

interface GridLayoutProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
  className?: string
}

export function GridLayout({
  children,
  columns = 4,
  gap = 'medium',
  className = ''
}: GridLayoutProps) {
  return (
    <div
      className={`grid-layout grid-cols-${columns} gap-${gap} ${className}`}
    >
      {children}
    </div>
  )
}
