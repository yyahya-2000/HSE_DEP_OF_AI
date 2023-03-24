import { PagingItem } from 'types'

export type PagingProps = {
  paging: PagingItem
  onChange: (page: number) => void
}
