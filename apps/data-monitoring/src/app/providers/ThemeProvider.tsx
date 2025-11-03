import React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <div>
      {/* TODO: 테마/다크모드 관리 */}
      {children}
    </div>
  )
}