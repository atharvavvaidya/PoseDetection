import { redirect } from 'react-router'
import { DashboardRouterType } from './_types/router.type'
import { ListOfMotionsPage } from './list-of-motions/list-of-motions.page'
import { MotionDetectPage } from './motion/motion.page'

export const DashboardRoutes = [
  { index: true, loader: () => redirect(DashboardRouterType.LIST_OF_MOTIONS) },
  { path: DashboardRouterType.TEST_MOTION, Component: MotionDetectPage },
  { path: DashboardRouterType.LIST_OF_MOTIONS, Component: ListOfMotionsPage }
]
