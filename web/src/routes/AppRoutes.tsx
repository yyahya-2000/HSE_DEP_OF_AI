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
  searchRoutes
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
    searchRoutes
  ])
  return routes
}

export default AppRoutes
