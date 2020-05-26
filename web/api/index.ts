import {AxiosResponse} from 'axios'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
export class MyResponse { 
    success: boolean = true
    data: any
    constructor() { 
        this.success = true
    }
}
export interface ICommonAPI { 
    findAllAPI(axios: NuxtAxiosInstance, pageSize: number, page: number): Promise<MyResponse>
    findOneAPI(axios:NuxtAxiosInstance,id:string): Promise<MyResponse>
}
