import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI from './common';
import { MyResponse } from './index';
export class AdAPI extends CommonAPI  {
    // protected prefix = '/categories'
    public imageUploadUrl: string
    constructor() {
        super('/ads');
        this.imageUploadUrl = this.prefix+'/img'
    }
}
const MyAdApi = new AdAPI()
export default MyAdApi