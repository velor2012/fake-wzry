import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI from './common';
import { MyResponse } from './index';
export class ItemAPI extends CommonAPI  {
    // protected prefix = '/categories'
    public iconUploadUrl: string
    constructor() {
        super('/items');
        this.iconUploadUrl = this.prefix+'/icons'
    }
}
const MyItemAPI = new ItemAPI()
export default MyItemAPI