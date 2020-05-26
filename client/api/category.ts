import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './index';
export class CategoryAPI extends CommonAPI  {
    // protected prefix = '/categories'
    constructor() {
        let prefix = '/categories'
        super(prefix);
    }
    async findAllParents(axios: NuxtAxiosInstance): Promise<MyResponse> { 
        let res = await axios.get(`${this.prefix}/parents`)
        return generateResponse(res as AxiosResponse)
    } 
    async findAllHeroCategories(axios: NuxtAxiosInstance): Promise<MyResponse> { 
        let res = await axios.get(`${this.prefix}/heroCategories`)
        return generateResponse(res as AxiosResponse)
    }
    async findAllNotHeroCategories(axios: NuxtAxiosInstance): Promise<MyResponse> { 
        let res = await axios.get(`${this.prefix}/notHeroCategories`)
        return generateResponse(res as AxiosResponse)
    }
}
const MyCategoryAPI = new CategoryAPI()
export default MyCategoryAPI