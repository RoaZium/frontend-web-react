import { ReactNode } from 'react'
import './PageLayout.css'

interface PageLayoutProps {
  children: ReactNode
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

interface PageContentProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="page-layout">{children}</div>
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  )
}

export function PageContent({ children, className = '' }: PageContentProps) {
  return <div className={`page-content ${className}`}>{children}</div>
}
