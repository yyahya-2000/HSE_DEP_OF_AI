import { Fragment } from 'react'

export const researchCenterRoutes = {
  path: 'research-center',
  children: [
    { path: '', element: <Fragment>projects</Fragment> },
    { path: ':id', element: <Fragment>project</Fragment> }
  ]
}