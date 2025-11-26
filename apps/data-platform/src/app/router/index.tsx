import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { DatasourcePage } from '@/pages/DatasourcePage'
import { PipelinePage } from '@/pages/PipelinePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { QualityPage } from '@/pages/QualityPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'datasource',
        element: <DatasourcePage />,
      },
      {
        path: 'pipeline',
        element: <PipelinePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'quality',
        element: <QualityPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
