import { ProjectsPage } from 'components'
import ProjectPage from 'components/Projects/Project/ProjectPage'
import { routers } from 'routers'

export const projectsRoutes = {
  path: routers.projects,
  children: [
    { path: '', element: <ProjectsPage /> },
    { path: ':id', element: <ProjectPage /> }
  ]
}
