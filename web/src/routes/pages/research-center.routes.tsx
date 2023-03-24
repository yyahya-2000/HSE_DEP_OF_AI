import { ResearchCenterPage, ResearchCentersPage } from 'components'
import { routers } from 'routers'

export const researchCenterRoutes = {
  path: routers.researchCenter,
  children: [
    { path: '', element: <ResearchCentersPage /> },
    { path: ':id', element: <ResearchCenterPage /> }
  ]
}