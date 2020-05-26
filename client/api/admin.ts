import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './index';
export class AdminAPI extends CommonAPI  {
    // protected prefix = '/categories'
    public avatarUploadUrl: string
    public adminLogoutUrl: string
    public adminLoginUrl: string
    public currentUserUrl: string
    public githubLoginUrl: string
    constructor() {
        super('/admins');
        this.avatarUploadUrl = this.prefix + '/avatar'
        this.adminLogoutUrl = this.prefix + '/logout'
        this.currentUserUrl = this.prefix + '/currentUser'
        this.adminLoginUrl = this.prefix + '/login'
        this.githubLoginUrl = this.prefix + '/login/github'
    }
    public async loginAPI(
        axios: NuxtAxiosInstance,
        user:object
    ): Promise<MyResponse> { 
		let res = await axios
			.post(`${this.prefix}/login`, user)
		return generateResponse(res as AxiosResponse);
    }
}
const MyAdminAPI = new AdminAPI()
export default MyAdminAPI