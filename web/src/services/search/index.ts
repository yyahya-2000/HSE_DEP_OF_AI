import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {getOrigin} from "../../utils";
import {defaultPaging} from "../../enums";
import {EntityFieldProps, EntityListProps} from "../../types";

const urlSearch = getOrigin() + 'api/search'

class SearchService{
    public loading = false
    public totalOrganization = 0
    public organizations: EntityListProps = []
    public products: EntityListProps = []
    public projects: EntityListProps = []
    public ResearchCenters: EntityListProps = []
    public UseCase: EntityListProps = []
    public paging = defaultPaging
    constructor() {
        makeAutoObservable(this)
    }

    async fetchSearchTotalOrganization(text: string){
        try{
            runInAction(() => (this.loading = true))
            const params = {
                text: text,
                page: defaultPaging.page,
                psize: defaultPaging.psize
            }
            const result = await axios.get(urlSearch, { params })
            if (result.status !== 200) {
                return console.log('result', result)
            }
            runInAction(() => {
                    const { status, data, total } = result.data.organization
                    if(status === 2){
                        return console.log('Error from server')
                    }
                    this.organizations = data.map((org) => {
                        const fields: EntityFieldProps[] = []
                        for(let key in org){
                            const val = org[key]
                            fields.push({
                                id: key,
                                label: val['label'],
                                value: val['value'],
                                type: val['type']
                            })
                        }
                        return {item:fields}
                    })
                }
            )
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => (this.loading = false))
        }
    }

    async fetchSearchTotalProduct(text: string){
        try{
            runInAction(() => (this.loading = true))
            const params = {
                text: text,
                page: defaultPaging.page,
                psize: defaultPaging.psize
            }
            const result = await axios.get(urlSearch, { params })
            if (result.status !== 200) {
                return console.log('result', result)
            }
            runInAction(() => {
                    const { status, data, total } = result.data.product
                    if(status === 2){
                        return console.log('Error from server')
                    }
                    this.products = data.map((org) => {
                        const fields: EntityFieldProps[] = []
                        for(let key in org){
                            const val = org[key]
                            fields.push({
                                id: key,
                                label: val['label'],
                                value: val['value'],
                                type: val['type']
                            })
                        }
                        return {item:fields}
                    })
                }
            )
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => (this.loading = false))
        }
    }
    async fetchSearchTotalProject(text: string){
        try{
            runInAction(() => (this.loading = true))
            const params = {
                text: text,
                page: defaultPaging.page,
                psize: defaultPaging.psize
            }
            const result = await axios.get(urlSearch, { params })
            if (result.status !== 200) {
                return console.log('result', result)
            }
            runInAction(() => {
                    const { status, data, total } = result.data.project
                    if(status === 2){
                        return console.log('Error from server')
                    }
                    this.projects = data.map((org) => {
                        const fields: EntityFieldProps[] = []
                        for(let key in org){
                            const val = org[key]
                            fields.push({
                                id: key,
                                label: val['label'],
                                value: val['value'],
                                type: val['type']
                            })
                        }
                        return {item:fields}
                    })
                }
            )
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => (this.loading = false))
        }
    }

    async fetchSearchTotalResearchCenter(text: string){
        try{
            runInAction(() => (this.loading = true))
            const params = {
                text: text,
                page: defaultPaging.page,
                psize: defaultPaging.psize
            }
            const result = await axios.get(urlSearch, { params })
            if (result.status !== 200) {
                return console.log('result', result)
            }
            runInAction(() => {
                    const { status, data, total } = result.data.research_center
                    if(status === 2){
                        return console.log('Error from server')
                    }
                    this.ResearchCenters = data.map((org) => {
                        const fields: EntityFieldProps[] = []
                        for(let key in org){
                            const val = org[key]
                            fields.push({
                                id: key,
                                label: val['label'],
                                value: val['value'],
                                type: val['type']
                            })
                        }
                        return {item:fields}
                    })
                }
            )
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => (this.loading = false))
        }
    }
    async fetchSearchTotalUseCase(text: string){
        try{
            runInAction(() => (this.loading = true))
            const params = {
                text: text,
                page: defaultPaging.page,
                psize: defaultPaging.psize
            }
            const result = await axios.get(urlSearch, { params })
            if (result.status !== 200) {
                return console.log('result', result)
            }
            runInAction(() => {
                    const { status, data, total } = result.data.use_case
                    if(status === 2){
                        return console.log('Error from server')
                    }
                    this.UseCase = data.map((org) => {
                        const fields: EntityFieldProps[] = []
                        for(let key in org){
                            const val = org[key]
                            fields.push({
                                id: key,
                                label: val['label'],
                                value: val['value'],
                                type: val['type']
                            })
                        }
                        return {item:fields}
                    })
                }
            )
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => (this.loading = false))
        }
    }
}







export const searchService = new SearchService()