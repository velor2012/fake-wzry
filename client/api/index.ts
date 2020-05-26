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
    createAPI(axios:NuxtAxiosInstance ,formdata:object): Promise<MyResponse>
    findOneAPI(axios:NuxtAxiosInstance,id:string): Promise<MyResponse>
    deleteAPI(axios:NuxtAxiosInstance,id:string): Promise<MyResponse>
    updateAPI(axios:NuxtAxiosInstance,id:string,formdata:object):Promise<MyResponse>
}
