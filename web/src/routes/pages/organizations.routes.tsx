import { Fragment } from 'react'

export const organizationsRoutes = {
  path: 'organizations',
  children: [
    {
      path: '',
      element: <Fragment>organizations</Fragment>
    }
  ]
}
