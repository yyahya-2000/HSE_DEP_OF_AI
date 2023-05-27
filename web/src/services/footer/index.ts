import {getOrigin} from "../../utils";
import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

const urlFeedback = getOrigin() + 'api/feedback'

class FooterService {
    public loading = false
    public answer = ''
    public ok = false

    constructor() {
        makeAutoObservable(this)
    }

    async fetchTotal(name: string, email: string, subject: string, message: string) {
        try {
            runInAction(() => (this.loading = true))
            const params = {
                name: name,
                email: email,
                subject: subject,
                message: message
            }
            const result = await axios.get(urlFeedback, {params})
            if (result.status !== 200) {
                return console.log('result', result)
            }
            runInAction(() => {
                const {status, data} = result.data
                if (status === 2) {
                    return console.log('Error from server')
                }
                this.answer = data
            })
            runInAction(() => (this.ok = true))
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => (this.loading = false))

        }
    }
}

export const footerService = new FooterService()
