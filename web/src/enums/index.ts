import { getOrigin } from 'utils'

export const defaultPaging = {
  page: 0,
  psize: 5,
  count: 0
}

export const urlFilterFields = getOrigin() + 'api/filter_fields'
