import { QueryProvider } from './providers'
import { AppRouter } from './router'
import './styles/globals.css'

export function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}
