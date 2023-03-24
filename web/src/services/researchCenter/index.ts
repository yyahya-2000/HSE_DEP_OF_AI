import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { getOrigin } from 'utils'
import { format } from 'date-fns'
import { returnIds } from 'utils'
import { defaultPaging } from 'enums'
import { EntityFieldProps, EntityItemProps, EntityListProps } from 'types'

const urlResearchCenters = getOrigin() + 'api/research_center'

class ResearchCenterService {
  public ResearchCenters: EntityListProps = []
  public paging = defaultPaging
  public detail: EntityItemProps = { item: [] }
  private filter = {}
  public lang = ''
  public loading = false
  constructor() {
    makeAutoObservable(this)
  }

  async fetchPagingResearchCenters(newPage: number, language: string) {
    try {
      runInAction(() => (this.loading = true))
      const params = {
        lang: this.lang,
        ...this.filter,
        psize: this.paging.psize,
        page: newPage
      }

      const result = await axios.get(urlResearchCenters, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        const { status, data, total } = result.data
        if (status === 2) {
          return console.log('Error from server')
        }
        this.ResearchCenters = data.map((org) => {
          const fields: EntityFieldProps[] = []
          for (let key in org) {
            const val = org[key]
            fields.push({
              id: key,
              label: val['label'],
              value: val['value'],
              type: val['type']
            })
          }
          return { item: fields }
        })
        this.lang = language
        this.paging = {
          ...this.paging,
          page: newPage,
          count: Math.ceil(total / defaultPaging.psize)
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  async fetchDetail(language: string, id: number) {
    try {
      runInAction(() => (this.loading = true))
      const params = {
        lang: language,
        nid: id
      }
      const result = await axios.get(`${urlResearchCenters}`, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        const { status, data } = result.data
        if (status === 2) {
          return console.log('Error from server')
        }
        for (let key in data[0]) {
          const val = data[0][key]
          this.detail.item.push({
            id: key,
            label: val['label'],
            value: val['value'],
            type: val['type']
          })
        }
        this.lang = language
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  async fetchResearchCentersFilter(language: string, filterParams) {
    try {
      runInAction(() => (this.loading = true))
      const tempFilterParams = this.parseFilterparams(filterParams)
      const params = {
        lang: language,
        page: defaultPaging.page,
        psize: defaultPaging.psize,
        ...tempFilterParams
      }
      const result = await axios.get(urlResearchCenters, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        const { status, data, total } = result.data
        if (status === 2) {
          return console.log('Error from server')
        }
        this.ResearchCenters = data.map((org) => {
          const fields: EntityFieldProps[] = []
          for (let key in org) {
            const val = org[key]
            fields.push({
              id: key,
              label: val['label'],
              value: val['value'],
              type: val['type']
            })
          }
          return { item: fields }
        })
        this.lang = language
        this.filter = tempFilterParams
        this.paging = {
          ...defaultPaging,
          count: Math.ceil(total / defaultPaging.psize)
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  private parseFilterparams = (filters) => {
    const typeIds = filters.type ? returnIds(filters.type) : null
    return {
      type: typeIds,
      title: filters.title.length ? filters.title : null,
      text: filters.text.length ? filters.text : null,
      date_start: filters.period.start
        ? format(filters.period.start, 'yyyy-MM-dd')
        : null,
      date_end: filters.period.end
        ? format(filters.period.end, 'yyyy-MM-dd')
        : null
    }
  }

  public cleanPage = () => {
    this.ResearchCenters = []
    this.paging = defaultPaging
    this.filter = {}
  }

  public cleanDetail = () => {
    this.detail.item = []
  }
}

export const researchCenterService = new ResearchCenterService()
