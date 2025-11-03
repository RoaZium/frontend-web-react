import React from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <div>
      {/* TODO: 인증 상태 관리 */}
      {children}
    </div>
  )
}