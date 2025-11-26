import { ReactNode } from 'react'
import './SplitLayout.css'

interface SplitLayoutProps {
  left: ReactNode
  right: ReactNode
  leftWidth?: '30%' | '40%' | '50%' | '60%' | '70%'
  gap?: 'small' | 'medium' | 'large'
  className?: string
}

export function SplitLayout({
  left,
  right,
  leftWidth = '30%',
  gap = 'medium',
  className = ''
}: SplitLayoutProps) {
  return (
    <div
      className={`split-layout gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `${leftWidth} 1fr`
      }}
    >
      <div className="split-left">{left}</div>
      <div className="split-right">{right}</div>
    </div>
  )
}
