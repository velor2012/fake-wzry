import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './index';
export class ArticleAPI extends CommonAPI  {
    // protected prefix = '/categories'
    constructor() {
        super('/articles');
    }
    async uploadImg(axios: NuxtAxiosInstance, file: File): Promise<MyResponse> { 
        var formData = new FormData();
        formData.append("image", file);
        let res = await axios.post(`${this.prefix}/img`,formData)
        return generateResponse(res as AxiosResponse)
    } 
}
const MyArticleAPI = new ArticleAPI()
export default MyArticleAPI