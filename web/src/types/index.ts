export type AnchorElType = null | HTMLElement

export type LinkItem = {
  title: string
  link: string
}

export type Navigation = {
  title: string
  link: string
  isLink?: boolean
  childrenLinks?: LinkItem[]
}

export type ChildrenProps = {
  children?: React.ReactNode
}

export type UrlBreadcrumd = {
  link: string
  name: string
}

export type OptionProps = {
  id: number
  label: string
}

export type PagingItem = {
  page: number
  psize: number
  count: number
}

export type FilterItemProps = {
  id: string
  label: string
  type: 'text' | 'multi-select' | 'switch' | 'date' | 'number'
  options?: OptionProps[]
  isDateStrat?: boolean
  isDateEnd?: boolean
  dictionaryId?: string
}

export type FilterProps = FilterItemProps[]

export type DictionaryItemProps = {
  id: number
  name: string
  bundle: string
  description?: string
}
export type LinkProps = {
  url: string
  text?: string
}

export type EntityFieldProps = {
  id: string
  label: string
  value: string[] | DictionaryItemProps[] | LinkProps[]
  type: string
}

export type EntityItemProps = {
  item: EntityFieldProps[]
}

export type EntityListProps = EntityItemProps[]
