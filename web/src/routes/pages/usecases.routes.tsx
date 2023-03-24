import { UsecasesPage, UsecasePage } from 'components'
import { routers } from 'routers'

export const usecasesRoutes = {
    path: routers.usecases,
    children: [
        { path: '', element: <UsecasesPage /> },
        { path: ':id', element: <UsecasePage /> }
    ]
}