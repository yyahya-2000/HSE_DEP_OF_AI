import { Fragment } from 'react'

export const productsRoutes = {
  path: 'products',
  children: [
    { path: '', element: <Fragment>products</Fragment> },
    { path: ':id', element: <Fragment>product</Fragment> }
  ]
}
