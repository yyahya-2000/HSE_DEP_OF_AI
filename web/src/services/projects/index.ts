import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { getOrigin, parseFilterValues } from 'utils'
import { format } from 'date-fns'
import { returnIds } from 'utils'
import { defaultPaging, urlFilterFields } from 'enums'
import {
  EntityFieldProps,
  EntityItemProps,
  EntityListProps,
  FilterProps
} from 'types'

const urlProjects = getOrigin() + 'api/project'

class ProjectService {
  public projects: EntityListProps = []
  public paging = defaultPaging
  public detail: EntityItemProps = { item: [] }
  private filter = {}
  private filterValues = {}
  public filterFields: FilterProps = []
  public lang = ''
  public loading = false
  public totalProject =0
  constructor() {
    makeAutoObservable(this)
  }

  async fetchTotal(){
    const result = await axios.get(urlProjects + '?psize=1')
    if (result.status !== 200) {
      return console.log('result', result)
    }
    runInAction(() => {
          const { status, data, total } = result.data
          if(status === 2){
            return console.log('Error from server')
          }
          this.totalProject = total
        }
    )
  }

  async fetchPagingProjects(newPage: number, language: string) {
    try {
      runInAction(() => (this.loading = true))
      const params = {
        lang: this.lang,
        ...this.filter,
        psize: this.paging.psize,
        page: newPage
      }

      const result = await axios.get(urlProjects, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        const { status, data, total } = result.data
        if (status === 2) {
          return console.log('Error from server')
        }
        this.projects = data.map((org) => {
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
      const result = await axios.get(`${urlProjects}`, { params })
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

  async fetchProjectsFilter(language: string, filterValues) {
    try {
      runInAction(() => (this.loading = true))
      const tempFilterParams = parseFilterValues(filterValues)
      const params = {
        lang: language,
        page: defaultPaging.page,
        psize: defaultPaging.psize,
        ...tempFilterParams
      }
      const result = await axios.get(urlProjects, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        const { status, data, total } = result.data
        if (status === 2) {
          return console.log('Error from server')
        }
        this.projects = data.map((org) => {
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
        this.filterValues = filterValues
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

  async fetchFilterElements(language: string) {
    try {
      runInAction(() => (this.loading = true))
      const params = {
        lang: language,
        bundle: 'project'
      }

      const result = await axios.get(urlFilterFields, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        this.filterFields = result.data
        this.lang = language
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  public getFilterValues = () => this.filterValues

  public cleanPage = () => {
    this.projects = []
    this.paging = defaultPaging
    this.filter = {}
  }

  public cleanDetail = () => {
    this.detail.item = []
  }
}

export const projectService = new ProjectService()
