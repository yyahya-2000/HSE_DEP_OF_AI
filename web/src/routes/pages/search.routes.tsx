import {SearchPage} from 'components'
import { routers } from 'routers'

export const searchRoutes = {
    path: routers.searchByKey,
    children: [
        { path: '', element: <SearchPage/> },
        { path: ':key', element: <SearchPage/> },

    ]
}