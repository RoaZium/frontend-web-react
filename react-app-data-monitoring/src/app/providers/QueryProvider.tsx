import React from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <div>
      {/* TODO: React Query 설정 */}
      {children}
    </div>
  )
}