import { ProductPage, ProductsPage } from 'components'
import { routers } from 'routers'

export const productsRoutes = {
  path: routers.products,
  children: [
    { path: '', element: <ProductsPage /> },
    { path: ':id', element: <ProductPage /> }
  ]
}
