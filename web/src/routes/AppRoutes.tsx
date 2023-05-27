import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import {
  commonRoutes,
  organizationsRoutes,
  productsRoutes,
  projectsRoutes,
  standRoutes,
  researchCenterRoutes,
  usecasesRoutes,
  searchRoutes,
  feedbackRoutes
} from './pages'

const AppRoutes: FC = () => {
  const routes = useRoutes([
    commonRoutes,
    organizationsRoutes,
    productsRoutes,
    projectsRoutes,
    standRoutes,
    researchCenterRoutes,
    usecasesRoutes,
    searchRoutes,
    feedbackRoutes
  ])
  return routes
}

export default AppRoutes
