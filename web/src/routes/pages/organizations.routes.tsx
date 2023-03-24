import { OrganizationPage, OrganizationsPage } from 'components'
import { routers } from 'routers'

export const organizationsRoutes = {
  path: routers.organizations,
  children: [
    { path: '', element: <OrganizationsPage /> },
    { path: ':id', element: <OrganizationPage /> }
  ]
}
