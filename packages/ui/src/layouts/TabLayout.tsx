import { ReactNode, useState } from 'react'
import './TabLayout.css'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabLayoutProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function TabLayout({ tabs, defaultTab, className = '' }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={`tab-layout ${className}`}>
      <div className="tab-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeContent}
      </div>
    </div>
  )
}
