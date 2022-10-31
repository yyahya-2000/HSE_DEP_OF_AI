import Stand from 'views/Stand'

export const standRoutes = {
  path: 'stand',
  children: [
    { path: '', element: <Stand /> }
  ]
}
