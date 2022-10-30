import { Fragment } from 'react'

export const projectsRoutes = {
  path: 'projects',
  children: [
    { path: '', element: <Fragment>projects</Fragment> },
    { path: ':id', element: <Fragment>project</Fragment> }
  ]
}
