import { createBrowserRouter, redirect } from 'react-router'
import { AppLayout } from './_layout/app.layout'
import { AppRouterType } from './_types/router.type'
import { AuthLayout } from './auth/_layout/auth.layout'
import { AuthRouterType } from './auth/_types/router.type'
import { AuthRoutes } from './auth/auth.router'
import { DashboardLayout } from './dashboard/_layout/dashboard.layout'
import { DashboardRouterType } from './dashboard/_types/router.type'
import { DashboardGuard } from './dashboard/dashboard.guard'
import { DashboardRoutes } from './dashboard/dashboard.router'

const router = [
  {
    path: AppRouterType.ROOT,
    Component: AppLayout,
    children: [
      { index: true, loader: () => redirect(DashboardRouterType.ROOT) },
      {
        path: AuthRouterType.ROOT,
        Component: AuthLayout,
        children: AuthRoutes
      },
      {
        path: DashboardRouterType.ROOT,
        element: (
          <DashboardGuard>
            <DashboardLayout />
          </DashboardGuard>
        ),
        children: DashboardRoutes
      }
    ]
  }
]

export const AppRotuer = createBrowserRouter(router)
