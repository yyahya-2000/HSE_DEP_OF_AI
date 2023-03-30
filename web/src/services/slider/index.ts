import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { EntityFieldProps, EntityListProps } from 'types'
import { getOrigin } from 'utils'

const urlSlider = getOrigin() + 'api/slider'

class SliderService {
  public slides: EntityListProps = []
  public lang = ''
  public loading = false
  constructor() {
    makeAutoObservable(this)
  }

  async fetchSlides(language: string) {
    try {
      runInAction(() => (this.loading = true))
      const params = {
        lang: language
      }

      const result = await axios.get(urlSlider, { params })
      if (result.status !== 200) {
        return console.log('result', result)
      }
      runInAction(() => {
        const { status, data } = result.data
        if (status === 2) {
          return console.log('Error from server')
        }
        this.slides = data.map((org) => {
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
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }
}

export const sliderService = new SliderService()
